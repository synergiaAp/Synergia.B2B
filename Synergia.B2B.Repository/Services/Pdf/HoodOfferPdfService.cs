//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Dto.Api.File;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Common.Resources;
//using Synergia.B2B.Repository.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Text;
//using System.Text.RegularExpressions;
//using System.Threading;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Services.Pdf
//{
//    public class HoodOfferPdfService : PdfService
//    {
//        protected HoodOffer HoodOffer { get; set; }
//        protected Language Language { get; set; }
//        protected InstallationObject InstallationObject { get; set; }
//        protected List<HoodOfferElement> HoodOfferElements { get; set; }
//        protected List<HoodOfferElementAirCalculationDevice> HoodOfferElementAirCalculationDevices { get; set; }
//        protected List<HoodOfferAccessory> HoodOfferAccessories { get; set; }

//        public HoodOfferPdfService(int hoodOfferId)
//           : base()
//        {
//            try
//            {
//                MarginTop = 5f;
//                MarginBottom = 10f;

//                HoodOffer = new HoodOfferRepository().GetById(hoodOfferId);
//                Language = new LanguageRepository().GetById(HoodOffer.LanguageId.Value);

//                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(Language.CultureName);
//                Thread.CurrentThread.CurrentUICulture = new CultureInfo(Language.CultureName);

//                if (HoodOffer.InstallationObjectObiektyId.HasValue)
//                {
//                    InstallationObject = new InstallationObjectRepository().GetById(HoodOffer.InstallationObjectObiektyId.Value);
//                }

//                HoodOfferElements = new HoodOfferElementRepository().GetByHoodOfferId(hoodOfferId).OrderBy(a => a.OrderNo).ToList();
//                HoodOfferElementAirCalculationDevices = new HoodOfferElementAirCalculationDeviceRepository().GetByHoodOfferId(hoodOfferId);
//                HoodOfferAccessories = new HoodOfferAccessoryRepository().GetByHoodOfferId(hoodOfferId);

//                FileName = HoodOfferHelper.GetPdfFileName(hoodOfferId);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }

//        public override FileDownloadResultDto Print()
//        {
//            var result = base.Print();

//            if (result != null && result.FileBytes != null && result.FileBytes.Any())
//            {
//                string directoryPath = HoodOfferHelper.GetFileDirectoryPath(HoodOffer.Id);
//                if (!string.IsNullOrEmpty(directoryPath))
//                {
//                    if (!Directory.Exists(directoryPath))
//                    {
//                        Directory.CreateDirectory(directoryPath);
//                    }
//                    System.IO.File.WriteAllBytes(Path.Combine(directoryPath, result.FileName),
//                        result.FileBytes);
//                }
//            }
//            return result;
//        }

//        protected override void LoadTemplateContent()
//        {
//            try
//            {
//                TemplateContent = TemplateHelper.GetTemplateContent("/Files/HoodOfferPdfFile?cultureName=" + Language.CultureName);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }

//        protected override void ConfigureReplacements()
//        {
//            #region HoodOfferElements
//            string hoodOfferElementItemHtml = TemplateContent.Substring(
//                               TemplateContent.IndexOf("<!--BeginHoodOfferElement-->"),
//                               TemplateContent.LastIndexOf("<!--EndHoodOfferElement-->") - TemplateContent.IndexOf("<!--BeginHoodOfferElement-->")
//                           );

//            StringBuilder sbHoodOfferElementRows = new StringBuilder();
//            foreach (var hoodOfferElement in HoodOfferElements)
//            {
//                var singleHoodOfferElement = hoodOfferElementItemHtml.Replace("#OrderNoText#", hoodOfferElement.OrderNoText)
//                        .Replace("#HoodNr#", hoodOfferElement.HoodNr)
//                        .Replace("#Type#", getHoodTypeText(hoodOfferElement))
//                        .Replace("#Description#", getHoodDescriptionText(hoodOfferElement))
//                        .Replace("#Symbol#", getHoodSymbol(hoodOfferElement))
//                        .Replace("#Height#", hoodOfferElement.Height.ToString())
//                        .Replace("#Width#", hoodOfferElement.Width.ToString())
//                        .Replace("#Length#", hoodOfferElement.Length.ToString())
//                        .Replace("#ExhaustStreamCalculated#", hoodOfferElement.ExhaustStreamCalculated.ToString())
//                        //.Replace("#ExhaustStreamAccepted#", (hoodOfferElement.ExhaustStreamAccepted + hoodOfferElement.AdditionalFilterExhaustStreamAccepted.GetValueOrDefault(0)).ToString())
//                        .Replace("#ExhaustStreamAcceptedOrAdditionalValue#", !string.IsNullOrEmpty(hoodOfferElement.ExhaustStreamAdditionalValue)
//                            ? hoodOfferElement.ExhaustStreamAdditionalValue
//                            : (hoodOfferElement.ExhaustStreamAccepted + hoodOfferElement.AdditionalFilterExhaustStreamAccepted.GetValueOrDefault(0)).ToString())
//                        .Replace("#VentilatorDiameter#", GetVentilatorDiameter(hoodOfferElement))
//                        .Replace("#LocationType#", getLocationType(hoodOfferElement))
//                        .Replace("#VentilatorCount#", GetVentilatorCount(hoodOfferElement))
//                        .Replace("#ExhaustCount#", (hoodOfferElement.ExhaustCount
//                            + (isAdditionalFilter(hoodOfferElement) ? hoodOfferElement.AdditionalFilterExhaustCount : 0)).ToString())
//                        .Replace("#VentilatorStream#", hoodOfferElement.VentilatorStream.ToString())
//                        .Replace("#ExhaustDiameter#",  GetExhaustDiameter(hoodOfferElement))
//                        .Replace("#FilterType#", getFilterTypeInfo(hoodOfferElement))
//                        .Replace("#FilterAccepted#", string.Join(", ", new string[] {
//                            hoodOfferElement.FilterAccepted,
//                            isAdditionalFilter(hoodOfferElement) ? hoodOfferElement.AdditionalFilterFilterAccepted : null
//                        }.Where(x => !string.IsNullOrEmpty(x))))
//                        .Replace("#FiltersCount#", (getFiltersCount(hoodOfferElement.FilterAccepted, hoodOfferElement.ExhaustCount, hoodOfferElement)
//                                + (isAdditionalFilter(hoodOfferElement) ? getFiltersCount(hoodOfferElement.AdditionalFilterFilterAccepted, hoodOfferElement.AdditionalFilterExhaustCount, hoodOfferElement) : 0))
//                            .GetValueOrDefault(0)
//                            .ToString())
//                        .Replace("#EmptyFiltersCount#", (getEmptyFiltersCount(hoodOfferElement.FilterAccepted, hoodOfferElement.ExhaustCount)
//                                + (isAdditionalFilter(hoodOfferElement) ? getEmptyFiltersCount(hoodOfferElement.AdditionalFilterFilterAccepted, hoodOfferElement.AdditionalFilterExhaustCount).GetValueOrDefault(0) : 0))
//                            .GetValueOrDefault(0)
//                            .ToString())
//                        .Replace("#Factor063Info#", getFactor063Info(hoodOfferElement))
//                        .Replace("#Material#", getMaterialInfo(hoodOfferElement))
//                        .Replace("#ModuleCount#", hoodOfferElement.ModuleCount.ToString())
//                        .Replace("#VentilatorWidth#", getVentilatorWidth(hoodOfferElement).ToString())
//                        .Replace("#CasetteLength#", string.Join("/", new string[] {
//                            getCasetteLength(hoodOfferElement.FilterAccepted, hoodOfferElement.FilterType).ToString(),
//                            isAdditionalFilter(hoodOfferElement) ? getCasetteLength(hoodOfferElement.AdditionalFilterFilterAccepted, hoodOfferElement.FilterType).ToString() : null
//                        }.Where(x => !string.IsNullOrEmpty(x))))
//                        .Replace("#LightingInfo#", getLightingInfo(hoodOfferElement))
//                        .Replace("#Accessories#", getAccessoriesInfo(hoodOfferElement).ReplaceNewLineToHtml())
//                        .Replace("#FiltersInfo#", getFiltersInfo(hoodOfferElement))
//                        .Replace("#WiresInfo#", getWiresInfo(hoodOfferElement))
//                        .Replace("#HoodFileName#", getHoodFileName(hoodOfferElement))
//                        .Replace("#Comments#", hoodOfferElement.Comments)
//                        .Replace("#DividerCondenstate#", getDividerCondensateInfo(hoodOfferElement))
//                        .Replace("#Quantity#", hoodOfferElement.Quantity.ToString())
//                        .Replace("#Weight#", (hoodOfferElement.FinalWeightSingleElement).ToString())
//                        ;

//                StringBuilder sbDevicesRows = new StringBuilder();
//                string deviceItemHtml = singleHoodOfferElement.Substring(
//                              singleHoodOfferElement.IndexOf("<!--BeginDeviceItem-->"),
//                              singleHoodOfferElement.LastIndexOf("<!--EndDeviceItem-->") - singleHoodOfferElement.IndexOf("<!--BeginDeviceItem-->")
//                          );
//                var airCalculationDevices = HoodOfferElementAirCalculationDevices.Where(x => x.HoodOfferAirCalculationDeviceId.HasValue && x.HoodOfferElementId == hoodOfferElement.Id)
//                    .OrderBy(x => x.OrderNo)
//                    .ToList();

//                foreach (var device in airCalculationDevices)
//                {
//                    sbDevicesRows.Append(deviceItemHtml
//                        .Replace("#OrderNo#", string.IsNullOrEmpty(device.CustomOrderNo) ? device.OrderNo.ToString() : device.CustomOrderNo)
//                        .Replace("#Name#", getAirCalculationDeviceName(device))
//                        .Replace("#Ke#", device.CRM_HoodOfferAirCalculationDevices?.Ke.ToString())
//                        .Replace("#P#", device.Power.ToString())
//                        .Replace("#S#", device.SValue < 0.5M ? $"<span class='text-danger'>{device.SValue}</span>" : device.SValue.ToString())
//                        .Replace("#Mp#", device.MpValue.ToString())
//                    );

//                }
//                singleHoodOfferElement = singleHoodOfferElement.Replace(deviceItemHtml, sbDevicesRows.ToString());
//                if (!airCalculationDevices.Any())
//                {
//                    singleHoodOfferElement = singleHoodOfferElement.Replace("#AirCalculationExists#", "");
//                }
//                sbHoodOfferElementRows.Append(singleHoodOfferElement);
//            }

//            Replacements.Add(hoodOfferElementItemHtml, sbHoodOfferElementRows.ToString().ReplaceNewLineToEmpty());
//            #endregion

//            #region Smoki
//            string smokiJuniorHtml = TemplateContent.Substring(
//                              TemplateContent.IndexOf("<!--BeginSmokiJunior-->"),
//                              TemplateContent.LastIndexOf("<!--EndSmokiJunior-->") - TemplateContent.IndexOf("<!--BeginSmokiJunior-->")
//                          );
//            StringBuilder sbSmokiJunior = new StringBuilder();
//            foreach (var accessory in HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte() && x.Name.ContainsCaseInsensitive("junior")))
//            {
//                var singleSmokiJunior = smokiJuniorHtml.Replace("#AdditionalAccessorySmokiType#", accessory.Name);

//                sbSmokiJunior.Append(singleSmokiJunior);
//            }
//            Replacements.Add(smokiJuniorHtml, sbSmokiJunior.ToString().ReplaceNewLineToEmpty());

//            string smokiMaxiHtml = TemplateContent.Substring(
//                  TemplateContent.IndexOf("<!--BeginSmokiMaxi-->"),
//                  TemplateContent.LastIndexOf("<!--EndSmokiMaxi-->") - TemplateContent.IndexOf("<!--BeginSmokiMaxi-->")
//              );
//            StringBuilder sbSmokiMaxi = new StringBuilder();
//            foreach (var accessory in HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte() && x.Name.ContainsCaseInsensitive("maxi")))
//            {
//                var singleSmokiMaxi = smokiMaxiHtml.Replace("#AdditionalAccessorySmokiType#", accessory.Name);

//                sbSmokiMaxi.Append(singleSmokiMaxi);
//            }
//            Replacements.Add(smokiMaxiHtml, sbSmokiMaxi.ToString().ReplaceNewLineToEmpty());
//            #endregion

//            base.ConfigureReplacements();
//            Replacements.Add("#OfferNumber#", HoodOffer.OfferNumber);
//            Replacements.Add("#Date#", DateTime.Today.ToString(DateTimeHelper.SynergiaDateFormat));
//            Replacements.Add("#City#", InstallationObject?.City);
//            Replacements.Add("#InstallationObject#", $"{InstallationObject?.Name} {InstallationObject?.Address}");
//            Replacements.Add("#ContactPerson#", HoodOffer.ContactPerson);
//            Replacements.Add("#ContactEmail#", HoodOffer.ContactEmail);
//            Replacements.Add("#ContactPhone#", HoodOffer.ContactPhone);
//            Replacements.Add("#LogoTextFontSize#", GetLogoTextFontSize());
//            Replacements.Add("#LogoImageWidth#", GetLogoImageWidth());

//            #region Accessories

//            #region Ansul
//            string ansulHoodOfferElementHtml = TemplateContent.Substring(
//                TemplateContent.IndexOf("<!--BeginAnsulHoodOfferElement-->"),
//                TemplateContent.LastIndexOf("<!--EndAnsulHoodOfferElement-->") - TemplateContent.IndexOf("<!--BeginAnsulHoodOfferElement-->")
//            );

//            StringBuilder sbAnsulHoodOfferElementRows = new StringBuilder();
//            foreach (var hoodOfferElement in HoodOfferElements)
//            {
//                sbAnsulHoodOfferElementRows.Append(ansulHoodOfferElementHtml.Replace("#OrderNoText#", hoodOfferElement.OrderNoText)
//                    .Replace("#AnsulHoodOfferElementDescription#", getAnsulHoodOfferElementDescription(hoodOfferElement)));
//            }
//            Replacements.Add(ansulHoodOfferElementHtml, sbAnsulHoodOfferElementRows.ToString().ReplaceNewLineToEmpty());
//            #endregion

//            var ventilatorsAccessories = HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Ventilator.ToByte()).ToList();
//            if (ventilatorsAccessories.Any())
//            {
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS300X600Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-300x600")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS300X1200Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-300x1200")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS600X600Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-600x600")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS600X900Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-600x900")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS600X1200Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-600x1200")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//                Replacements.Add("#AdditionalAccessoryVentilatorsJRS600X1800Count#", ventilatorsAccessories
//                    .Where(x => x.Name == "Nawiewnik JRS-600x1800")
//                    .Sum(x => (int?)x.Quantity)
//                    .GetValueOrDefault(0)
//                    .ToString());
//            }

//            byte zalacznikCount = 1;
//            if (HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Ventilator.ToByte()).Any())
//            {
//                Replacements.Add("#ZalacznikNrNawiewniki#", (zalacznikCount++).ToString());
//            }

//            if (HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte()).Any())
//            {
//                Replacements.Add("#ZalacznikNrSmoki#", (zalacznikCount++).ToString());
//            }

//            if (HoodOfferElements.Where(x => x.AdditionalAccessoryAnsulEnabled).Any())
//            {
//                Replacements.Add("#ZalacznikNrAnsul#", (zalacznikCount++).ToString());
//            }

//            Replacements.Add("#AdditionalAccessoryVentilatorsEnabled#", ventilatorsAccessories.Any() ? "true" : "");
//            Replacements.Add("#AdditionalAccessorySmokiJuniorEnabled#", HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte() && x.Name.ContainsCaseInsensitive("junior")).Any()
//                ? "true"
//                : "");
//            Replacements.Add("#AdditionalAccessorySmokiMaxiEnabled#", HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte() && x.Name.ContainsCaseInsensitive("maxi")).Any()
//                ? "true"
//                : "");
//            Replacements.Add("#AdditionalAccessoryAnsulEnabled#", HoodOfferElements.Where(x => x.AdditionalAccessoryAnsulEnabled /*&& x.AdditionalAccessoryAnsulType != "Brak wyboru"*/).Any()
//                ? "true"
//                : "");
//            Replacements.Add("#AdditionalAccessoryAnsulItemsEnabled#", HoodOfferElements.Where(x => x.AdditionalAccessoryAnsulEnabled && x.AdditionalAccessoryAnsulType != "Brak wyboru").Any()
//               ? "true"
//               : "");

//            #endregion
//        }

//        private string GetVentilatorCount(HoodOfferElement hoodOfferElement)
//        {
//            if (!string.IsNullOrEmpty(hoodOfferElement.VentilatorCountAdditionalValue))
//            {
//                return hoodOfferElement.VentilatorCountAdditionalValue;
//            }
//            return hoodOfferElement.VentilatorCount.ToString();
//        }

//        private string GetVentilatorDiameter(HoodOfferElement hoodOfferElement)
//        {
//            if (!string.IsNullOrEmpty(hoodOfferElement.VentilatorDiameterAdditionalValue))
//            {
//                return hoodOfferElement.VentilatorDiameterAdditionalValue;
//            }
//            return hoodOfferElement.VentilatorDiameter.ToString();
//        }

//        private string GetExhaustDiameter(HoodOfferElement hoodOfferElement)
//        {
//            if (!string.IsNullOrEmpty(hoodOfferElement.ExhaustDiameterAdditionalValue) 
//                && !string.IsNullOrEmpty(hoodOfferElement.ExhaustCountAdditionalValue))
//            {
//                return hoodOfferElement.ExhaustDiameterAdditionalValue;
//            }
//            else
//            {
//                return hoodOfferElement.ExhaustDiameter.ToString();
//            }
//        }

//        private string GetLogoImageWidth()
//        {
//            switch (Language.Name)
//            {
//                case "Polski":
//                case "Angielski":
//                    return "4";
//                case "Ukraiński":
//                default:
//                    return "3.8";
//            }
//        }

//        private string GetLogoTextFontSize()
//        {
//            switch (Language.Name)
//            {
//                case "Polski":
//                    return "7.5";
//                case "Angielski":
//                    return "7.1";
//                case "Ukraiński":
//                default:
//                    return "7.8";
//            }
//        }

//        private string getAnsulHoodOfferElementDescription(HoodOfferElement hoodOfferElement)
//        {
//            if (!hoodOfferElement.AdditionalAccessoryAnsulEnabled || hoodOfferElement.AdditionalAccessoryAnsulType == "Brak wyboru")
//            {
//                return ResHoodOffer.AnsulUkladOpisNieWymagany;
//            }
//            else
//            {
//                string ansulHoodOfferElementDescription = ResHoodOffer.AnsulUkladOpis;
//                int zbiornikCount = int.Parse(hoodOfferElement.AdditionalAccessoryAnsulType
//                    .Substring(hoodOfferElement.AdditionalAccessoryAnsulType.IndexOf("-") - 1, 1));
//                string zbiornikName = hoodOfferElement.AdditionalAccessoryAnsulType.ContainsCaseInsensitive("dedykowany")
//                    ? ResHoodOffer.UkladDedykowany
//                    : ResHoodOffer.UkladNakladajacySie;
//                return string.Format(ansulHoodOfferElementDescription, $"{zbiornikName} {zbiornikCount}-{ResHoodOffer.Zbiornikowy.ToLower()}", zbiornikCount * 11);
//            }
//        }

//        #region Private
//        private string getAirCalculationDeviceName(HoodOfferElementAirCalculationDevice device)
//        {
//            if (!string.IsNullOrEmpty(device.AdditionalName))
//            {
//                return device.AdditionalName;
//            }
//            else
//            {
//                switch (device.CRM_HoodOfferAirCalculationDevices?.Name)
//                {
//                    case "Kocioł warzelny":
//                        return ResHoodOffer.UrzadzenieKociolWarzelny;
//                    case "Szybkowar":
//                        return ResHoodOffer.UrzadzenieSzybkowar;
//                    case "Piec konwekcyjno-parowy":
//                        return ResHoodOffer.UrzadzeniePiecKonwekcyjnoParowy;
//                    case "Piec kombi":
//                        return ResHoodOffer.UrzadzeniePiecKombi;
//                    case "Piec do pizzy":
//                        return ResHoodOffer.UrzadzeniePiecDoPizzy;
//                    case "Salamander":
//                        return ResHoodOffer.UrzadzenieSalamander;
//                    case "Opiekacz gastronomiczny":
//                        return ResHoodOffer.UrzadzenieOpiekaczGastronomiczny;
//                    case "Patelnia":
//                        return ResHoodOffer.UrzadzeniePatelnia;
//                    case "Frytkownica":
//                        return ResHoodOffer.UrzadzenieFrytkownica;
//                    case "Trzon kuchenny":
//                        return ResHoodOffer.UrzadzenieTrzonKuchenny;
//                    case "Płyta indukcyjna":
//                        return ResHoodOffer.UrzadzeniePlytaIndukcyjna;
//                    case "Płyta grillowa":
//                        return ResHoodOffer.UrzadzeniePlytaGrillowa;
//                    case "Bemar":
//                        return ResHoodOffer.UrzadzenieBemar;
//                    case "Zmywarka":
//                        return ResHoodOffer.UrzadzenieZmywarka;
//                    case "Taboret grzewczy":
//                        return ResHoodOffer.UrzadzenieTaboretGrzewczy;
//                    case "Warnik":
//                        return ResHoodOffer.UrzadzenieWarnik;
//                    case "Patelnia Wok":
//                        return ResHoodOffer.UrzadzeniePatelniaWok;
//                    default:
//                        return device.CRM_HoodOfferAirCalculationDevices?.Name;
//                }
//            }
//        }

//        private string getLocationType(HoodOfferElement hoodOfferElement)
//        {
//            switch (hoodOfferElement.LocationType)
//            {
//                case "Wyspowy":
//                    return ResHoodOffer.Wyspowy;
//                case "Przyścienny":
//                    return ResHoodOffer.Przyscienny;
//                default:
//                    return null;
//            }
//        }

//        private string getFilterTypeInfo(HoodOfferElement hoodOfferElement)
//        {
//            List<string> result = new List<string>();

//            result.Add(getSingleFilterTypeDescription(hoodOfferElement.FilterType?.Replace("8", "").Replace("5", "")));

//            if (isAdditionalFilter(hoodOfferElement))
//            {
//                result.Add(getSingleFilterTypeDescription(hoodOfferElement.AdditionalFilterFilterAccepted.Substring(0, 3)));
//            }

//            return string.Join(", ", result.Distinct());
//        }

//        private string getSingleFilterTypeDescription(string filterType)
//        {
//            switch (filterType)
//            {
//                case "JCE":
//                    return ResHoodOffer.TypFiltraJCE;
//                case "JFF":
//                    return ResHoodOffer.TypFiltraJFF;
//                case "UV":
//                    return ResHoodOffer.TypFiltraUV;
//                case "TurboSwing":
//                    return ResHoodOffer.TypFiltraTurboSwing;
//                case "UV-Turbo":
//                    return ResHoodOffer.TypFiltraUVTurbo;
//            }

//            return null;
//        }

//        private string getHoodTypeText(HoodOfferElement hoodOfferElement)
//        {
//            switch (hoodOfferElement.Type)
//            {
//                case "JSI-R":
//                case "JSI-S":
//                case "JSVI-R":
//                case "JSVI-R-W":
//                case "JSVI-S":
//                case "JSVI-S-W":
//                    return ResHoodOffer.TypOkapuJSI_R;
//                case "JVI-R":
//                case "JVI-R-W":
//                    return ResHoodOffer.TypOkapuJVI_R;
//                case "JLI-R":
//                case "JLI-S":
//                    return ResHoodOffer.TypOkapuJLI_R;
//                case "JSKI":
//                    return ResHoodOffer.TypOkapuJSKI;
//                case "JKI":
//                    return ResHoodOffer.TypOkapuJKI;
//                default:
//                    return "";
//            }
//        }

//        private bool isAdditionalFilter(HoodOfferElement hoodOfferElement)
//        {
//            return hoodOfferElement.AdditionalFilterExhaustCount.HasValue && hoodOfferElement.AdditionalFilterExhaustStreamAccepted.HasValue
//                && !string.IsNullOrEmpty(hoodOfferElement.AdditionalFilterFilterAccepted);
//        }

//        private string getHoodDescriptionText(HoodOfferElement hoodOfferElement)
//        {
//            int? exhaustStreamAcceptedSingleExhaust = hoodOfferElement.ExhaustStreamAccepted; //(hoodOfferElement.ExhaustStreamAccepted + (isAdditionalFilter(hoodOfferElement) ? hoodOfferElement.AdditionalFilterExhaustCount : 0)) / hoodOfferElement.ExhaustCount;
//            switch (getHoodSymbol(hoodOfferElement).Replace("-W", ""))
//            {
//                case "JSI-R-JCE":
//                    return ResHoodOffer.OpisOkapuJSI_R_JCE;
//                //return "Okap JSI-R wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o sprawności do 93% i stałymi oporami przepływu powietrza na poziomie 50-65 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-S-JCE":
//                    return ResHoodOffer.OpisOkapuJSI_S_JCE;
//                //return "Okap szklany JSI-S wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o sprawności do 93% i stałymi oporami przepływu powietrza na poziomie 50-65 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSVI-R-JCE":
//                    return ResHoodOffer.OpisOkapuJSVI_R_JCE;
//                //return "Okap JSVI-R wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o sprawności do 93% i stałymi oporami przepływu powietrza na poziomie 50-65 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JVI-R-JCE":
//                    return ResHoodOffer.OpisOkapuJVI_R_JCE;
//                //return "Okap JVI-R wyciągowy z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu oraz filtrami cyklonowymi cylindrycznymi typu JCE o sprawności do 93% i stałych oporach przepływu powietrza na poziomie 50-65 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-R-JCE":
//                    return ResHoodOffer.OpisOkapuJLI_R_JCE;
//                //return "Okap JLI-R wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza na poziomie 50-65 Pa. Sprawność filtra do 93%. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-S-JCE":
//                    return ResHoodOffer.OpisOkapuJLI_S_JCE;
//                //return "Okap szklany JLI-S wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza na poziomie 50-65 Pa. Sprawność filtra do 93%. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSKI":
//                    return ResHoodOffer.OpisOkapuJSKI;
//                //return "Okap JSKI wyciągowo-nawiewny wyciągowy typu kondensacyjnego z nawiewnikami świeżego powietrza oraz płytami ociekowymi. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JKI":
//                    return ResHoodOffer.OpisOkapuJKI;
//                //return "Okap JKI wyciągowy typu kondensacyjnego z płytami ociekowymi. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-R-FF":
//                    return ResHoodOffer.OpisOkapuJSI_R_FF;
//                //return "Okap JSI-R-FF wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-S-FF":
//                    return ResHoodOffer.OpisOkapuJSI_S_FF;
//                //return "Okap szklany JSI-S-FF wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSVI-R-FF":
//                    return ResHoodOffer.OpisOkapuJSVI_R_FF;
//                //return "Okap JSVI-R-FF wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JVI-R-FF":
//                    return ResHoodOffer.OpisOkapuJVI_R_FF;
//                //return "Okap JVI-R-FF wyciągowy z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-R-FF":
//                    return ResHoodOffer.OpisOkapuJLI_R_FF;
//                //return "Okap JLI-R-FF wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-S-FF":
//                    return ResHoodOffer.OpisOkapuJLI_S_FF;
//                //return "Okap szklany JLI-S-FF wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza oraz z filtrem siatkowym FF. Całkowita sprawność filtrów do 95%. Opory przepływu powietrza na poziomie 80-85 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-R-UV":
//                    return ResHoodOffer.OpisOkapuJSI_R_UV;
//                //return "Okap JSI-R-UV wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-S-UV":
//                    return ResHoodOffer.OpisOkapuJSI_S_UV;
//                //return "Okap szklany JSI-S-UV wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSVI-R-UV":
//                    return ResHoodOffer.OpisOkapuJSVI_R_UV;
//                //return "Okap JSVI-R-UV wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JVI-R-UV":
//                    return ResHoodOffer.OpisOkapuJVI_R_UV;
//                //return "Okap JVI-R-UV wyciągowy z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu. Kaseta filtracyjna z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-R-UV":
//                    return ResHoodOffer.OpisOkapuJLI_R_UV;
//                //return "Okap JLI-R-UV wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-S-UV":
//                    return ResHoodOffer.OpisOkapuJLI_S_UV;
//                //return "Okap szklany JLI-S-UV wyciągowy z filtrami cyklonowymi cylindrycznymi typu JCE o stałych oporach przepływu powietrza, z filtrem siatkowym FF oraz z filtrem ultrafioletowym UV Combilux. Całkowita sprawność filtrów do 99.9%. Opory przepływu powietrza na poziomie 85-90 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-R-Turbo":
//                    return ResHoodOffer.OpisOkapuJSI_R_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JSI-R-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem TurboSwing o sprawności do 98%, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-S-Turbo":
//                    return ResHoodOffer.OpisOkapuJSI_S_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap szklany JSI-S-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem TurboSwing o sprawności do 98%, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSVI-R-Turbo":
//                    return ResHoodOffer.OpisOkapuJSVI_R_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JSVI-R-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem TurboSwing o sprawności do 98%, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JVI-R-Turbo":
//                    return ResHoodOffer.OpisOkapuJVI_R_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JVI-R-Turbo z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem TurboSwing o sprawności do 98%, umożliwiającym również regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-R-Turbo":
//                    return ResHoodOffer.OpisOkapuJLI_R_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JLI-R-Turbo wyciągowy z filtrem TurboSwing o sprawności do 98%, umożliwiającym również regulacją wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-S-Turbo":
//                    return ResHoodOffer.OpisOkapuJLI_S_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap szklany JLI-S-Turbo wyciągowy z filtrem TurboSwing o sprawności do 98%, umożliwiającym również regulacją wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-R-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJSI_R_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JSI-R-UV-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSI-S-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJSI_S_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap szklany JSI-S-UV-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JSVI-R-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJSVI_R_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JSVI-R-UV-Turbo wyciągowo-nawiewny z nawiewnikami świeżego powietrza, z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu, z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza# m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JVI-R-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJVI_R_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JVI-R-UV-Turbo z komorami ciśnieniowymi formującymi wiązki powietrza wspomagające kierowanie wywiewanego powietrza do wnętrza okapu z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym również regulację wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-R-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJLI_R_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap JLI-R-UV-Turbo wyciągowy z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym również regulacją wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                case "JLI-S-UV-Turbo":
//                    return ResHoodOffer.OpisOkapuJLI_S_UV_Turbo.Replace("#MaxWydatekPowietrza#", exhaustStreamAcceptedSingleExhaust.ToString());
//                //return $"Okap szklany JLI-S-UV-Turbo wyciągowy z filtrem UV-Turbo o sprawności usuwania tłuszczu do 98% i redukującym zapachy, umożliwiającym również regulacją wydatku powietrza w zakresie od 0m3/h do #MaxWydatekPowietrza#m3/h bez spadku sprawności filtracji. Opory przepływu powietrza do 60 Pa. Wykonanie okapu ze stali nierdzewnej AISI 304.";
//                default:
//                    return "";
//            }
//        }

//        private string getHoodSymbol(HoodOfferElement hoodOfferElement)
//        {
//            string result = hoodOfferElement.Type;
//            if (!string.IsNullOrEmpty(hoodOfferElement.FilterType))
//            {
//                result += "-" + hoodOfferElement.FilterType.Replace("JFF8", "FF").Replace("JFF5", "FF");
//            }
//            return result;
//        }

//        private int? getFiltersCount(string filterAccepted, int? exhaustCount, HoodOfferElement hoodOfferElement)
//        {
//            int? result = null;

//            if (!string.IsNullOrEmpty(filterAccepted))
//            {
//                if (filterAccepted.Contains("-"))
//                {
//                    result = ParseHelper.ToIntN(filterAccepted[filterAccepted.IndexOf("-") + 1]);
//                }
//                else
//                {
//                    result = ParseHelper.ToIntN(filterAccepted[filterAccepted.Length - 1]);
//                }
//                result *= exhaustCount;
//            }
//            else if (hoodOfferElement.FilterType == "Turbo" || hoodOfferElement.FilterType == "UV-Turbo")
//            {
//                result = exhaustCount;
//            }
//            return result;
//        }

//        private int? getEmptyFiltersCount(string filterAccepted, int? exhaustCount)
//        {
//            int? result = null;

//            if (!string.IsNullOrEmpty(filterAccepted))
//            {
//                if (filterAccepted.Contains("+"))
//                {
//                    result = ParseHelper.ToIntN(filterAccepted[filterAccepted.IndexOf("+") + 1]);
//                }
//                result *= exhaustCount;
//            }
//            return result;
//        }

//        private string getFactor063Info(HoodOfferElement hoodOfferElement)
//        {
//            if (hoodOfferElement.Factor063Enabled)
//            {
//                return ResHoodOffer.Wspolczynnik063Info;
//                //return "W obliczonym minimalnym strumieniu powietrza wywiewanego uwzględniono współczynnik redukcyjny 0,63 dla okapu usytuowanego przyściennie.";
//            }
//            else
//            {
//                return "";
//            }
//        }

//        private string getMaterialInfo(HoodOfferElement hoodOfferElement)
//        {
//            if (hoodOfferElement.Type.Contains("-S"))
//            //if (hoodOfferElement.Type == "JSI-S")
//            {
//                return ResHoodOffer.MaterialWykonaniaSzklo;
//                //return "Szkło";
//            }
//            else
//            {
//                return ResHoodOffer.MaterialWykonaniaStalNierdzewna;
//                //return "Stal nierdzewna AISI 304";
//            }
//        }

//        private int? getVentilatorWidth(HoodOfferElement hoodOfferElement)
//        {
//            if (hoodOfferElement.Height == 540)
//            {
//                if (hoodOfferElement.VentilatorDiameter == 250)
//                {
//                    return 500;
//                }
//                else if (hoodOfferElement.VentilatorDiameter == 160)
//                {
//                    return 200;
//                }
//            }
//            else if (hoodOfferElement.Height == 330 && hoodOfferElement.VentilatorDiameter == 200)
//            {
//                return 500;
//            }
//            return null;
//        }

//        private int? getCasetteLength(string filterAccepted, string filterType)
//        {
//            switch (filterAccepted)
//            {
//                case "JFF-1+4":
//                case "JFF-2+3":
//                case "JFF-3+2":
//                case "JFF-4+1":
//                case "JFF-5":
//                    return 646;
//                case "JFF-1+7'":
//                case "JFF-2+6'":
//                case "JFF-3+5'":
//                case "JFF-4+4":
//                case "JFF-5+3":
//                case "JFF-6+2":
//                case "JFF-7+1":
//                case "JFF-8":
//                case "UV":
//                    return 990;
//                case "JCE-1+1":
//                case "JCE2":
//                    return 240;
//                case "JCE3":
//                    return 358;
//                case "JCE4":
//                    return 470;
//                case "JCE5":
//                    return 588;
//                case "JCE6":
//                    return 705;
//                case "JCE7":
//                    return 822;
//                case "JCE8":
//                    return 940;
//            }

//            if (filterType == "Turbo" || filterType == "UV-Turbo")
//            {
//                return 500;
//            }

//            return null;
//        }

//        private string getLightingInfo(HoodOfferElement hoodOfferElement)
//        {
//            StringBuilder sbResult = new StringBuilder();
//            //if (hoodOfferElement.LightingCodar14Count > 0)
//            //{
//            //    sbResult.Append($"<div>Oprawa T5 IP66 2x14W - {hoodOfferElement.LightingCodar14Count} {ResHoodOffer.Szt}</div>");
//            //}
//            //if (hoodOfferElement.LightingCodar28Count > 0)
//            //{
//            //    sbResult.Append($"<div>Oprawa T5 IP66 2x28W - {hoodOfferElement.LightingCodar28Count} {ResHoodOffer.Szt}</div>");
//            //}
//            //if (hoodOfferElement.LightingCodar49Count > 0)
//            //{
//            //    sbResult.Append($"<div>Oprawa T5 IP66 2x49W - {hoodOfferElement.LightingCodar49Count} {ResHoodOffer.Szt}</div>");
//            //}
//            if (hoodOfferElement.LightingLED6018WCount > 0)
//            {
//                sbResult.Append($"<div>LED60 18W IP65 4000K - {hoodOfferElement.LightingLED6018WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED12036WCount > 0)
//            {
//                sbResult.Append($"<div>LED120 36W IP65 4000K - {hoodOfferElement.LightingLED12036WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED15050WCount > 0)
//            {
//                sbResult.Append($"<div>LED150 50W IP65 4000K - {hoodOfferElement.LightingLED15050WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED6030WCount > 0)
//            {
//                sbResult.Append($"<div>LED60 30W IP65 4000K - {hoodOfferElement.LightingLED6030WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED9045WCount > 0)
//            {
//                sbResult.Append($"<div>LED90 45W IP65 4000K - {hoodOfferElement.LightingLED9045WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED12060WCount > 0)
//            {
//                sbResult.Append($"<div>LED120 60W IP65 4000K - {hoodOfferElement.LightingLED12060WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED15075WCount > 0)
//            {
//                sbResult.Append($"<div>LED150 75W IP65 4000K - {hoodOfferElement.LightingLED15075WCount} {ResHoodOffer.Szt}</div>");
//            }
//            if (hoodOfferElement.LightingLED9Count > 0)
//            {
//                sbResult.Append($"<div>{ResHoodOffer.OswietlenieLedowePunktowe} IP65 9W - {hoodOfferElement.LightingLED9Count} {ResHoodOffer.Szt}</div>");
//            }

//            int? wattsSum = (hoodOfferElement.LightingLED12036WCount * 36).GetValueOrDefault(0) + (hoodOfferElement.LightingLED12060WCount * 60).GetValueOrDefault(0)
//                + (hoodOfferElement.LightingLED15050WCount * 50).GetValueOrDefault(0) + (hoodOfferElement.LightingLED15075WCount * 75).GetValueOrDefault(0)
//                + (hoodOfferElement.LightingLED6018WCount * 18).GetValueOrDefault(0) + (hoodOfferElement.LightingLED6030WCount * 30).GetValueOrDefault(0)
//                + (hoodOfferElement.LightingLED9045WCount * 45).GetValueOrDefault(0) + (hoodOfferElement.LightingLED9Count * 9).GetValueOrDefault(0);
//            if (wattsSum > 0)
//            {
//                sbResult.Append($"<div class='underline'>{ResHoodOffer.LacznaMocElektrycznaOswietlenia} – {wattsSum}W, ~230V</div>");
//            }
//            return sbResult.ToString();
//        }

//        private string getAccessoriesInfo(HoodOfferElement hoodOfferElement)
//        {
//            string result = "";

//            byte zalacznikCount = 1;
//            if (HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Ventilator.ToByte()).Any())
//            {
//                zalacznikCount++;
//                //result += $"Nawiewniki wyporowe – dla zbilansowania strumienia nawiewu i wywiewu (Załącznik {zalacznikCount++})\n";
//            }

//            if (HoodOfferAccessories.Where(x => x.Type == HoodOfferAccessoryType.Smoki.ToByte()).Any())
//            {
//                zalacznikCount++;
//                //result += $"Smoki – system filtracji sadzy (Załącznik {zalacznikCount++})\n";
//            }

//            if (hoodOfferElement.AdditionalAccessoryAnsulEnabled)
//            {
//                if (hoodOfferElement.AdditionalAccessoryAnsulType != "Brak wyboru")
//                {
//                    result += $"{ResHoodOffer.AnsulSystemPrzeciwpozarowyDoOkapow} ({ResHoodOffer.Zalacznik} {zalacznikCount++})\n";
//                }
//                else
//                {
//                    result += $"{ResHoodOffer.AnsulOkapWyposazonyWSystemPrzeciwpozarowy}\n";
//                }
//            }

//            if (hoodOfferElement.ControlUnitCount > 0)
//            //hoodOfferElement.ControlPanelUnitEnabled || hoodOfferElement.FilterType == "UV")
//            {
//                result += $"{ResHoodOffer.JednostkaSterujaca} ({hoodOfferElement.ControlUnitCount} {ResHoodOffer.Szt})";
//                if (hoodOfferElement.ControlPanelCount > 0)
//                {
//                    result += $" {ResHoodOffer.WrazZPanelemDotykowym} ({hoodOfferElement.ControlPanelCount} {ResHoodOffer.Szt})";
//                }
//            }
//            return result;
//        }

//        private string getFiltersInfo(HoodOfferElement hoodOfferElement)
//        {
//            switch (hoodOfferElement.FilterType)
//            {
//                case "UV":
//                    return $"<div>{ResHoodOffer.FiltrUVCombilux} – 6x39W - {hoodOfferElement.ExhaustCount} {ResHoodOffer.Szt}</div><div class='underline'>{ResHoodOffer.LacznaMocElektrycznaFiltrow} – {hoodOfferElement.ExhaustCount * 6 * 39}W, ~230V</div>";
//                case "Turbo":
//                    return $"<div>{ResHoodOffer.FiltrTurboSwing} – 35W - {hoodOfferElement.ExhaustCount} {ResHoodOffer.Szt}</div><div class='underline'>{ResHoodOffer.LacznaMocElektrycznaFiltrow} – {hoodOfferElement.ExhaustCount * 35}W, ~230V</div>";
//                case "UV-Turbo":
//                    return $"<div>{ResHoodOffer.FiltrUVTurbo} – 53W - {hoodOfferElement.ExhaustCount} {ResHoodOffer.Szt}</div><div class='underline'>{ResHoodOffer.LacznaMocElektrycznaFiltrow} – {hoodOfferElement.ExhaustCount * 53}W, ~230V</div>";
//                default:
//                    return "";
//            }
//        }

//        private string getWiresInfo(HoodOfferElement hoodOfferElement)
//        {
//            if (hoodOfferElement.Type.Contains("-W") && hoodOfferElement.WiresCount > 0)
//            {
//                return $"<div>W-100 – 14W - {hoodOfferElement.WiresCount} {ResHoodOffer.Szt}</div><div class='underline'>{ResHoodOffer.LacznaMocElektrycznaWentylatorow} - {hoodOfferElement.WiresCount * 14}W, ~230V </div>";
//            }
//            return "";
//        }

//        private string getHoodFileName(HoodOfferElement hoodOfferElement)
//        {
//            string result = "";
//            switch (hoodOfferElement.Type)
//            {
//                case "JSI-R":
//                case "JSI-S":
//                case "JSVI-S":
//                case "JSVI-S-W":
//                case "JSVI-R":
//                case "JSVI-R-W":
//                    result = "SYNERGIA_JSI_filtr_";
//                    break;
//                case "JVI-R":
//                case "JVI-R-W":
//                    result = "SYNERGIA_JVI_filtr_";
//                    break;
//                case "JLI-R":
//                case "JLI-S":
//                    result = "SYNERGIA_JLI_filtr_";
//                    break;
//                case "JSKI":
//                    return "SYNERGIA_JSKI_dol_pop.png";
//                case "JKI":
//                    return "SYNERGIA_JKI_dol_pop.png";
//            }

//            switch (hoodOfferElement.FilterType)
//            {
//                case "Turbo":
//                case "UV-Turbo":
//                    result += "TURBOSWING";
//                    break;
//                default:
//                    result += "JFF";
//                    break;
//            }
//            result += "_dol_pop.png";

//            return result;
//        }

//        private string getDividerCondensateInfo(HoodOfferElement hoodOfferElement)
//        {
//            if (hoodOfferElement.Type == "JSKI" || hoodOfferElement.Type == "JKI")
//            {
//                int? hobValue = (int?)(hoodOfferElement.ExhaustStreamAccepted / (double?)hoodOfferElement.Length / 3.6 * 1000);
//                if (hobValue >= 0 && hobValue <= 100)
//                {
//                    return $"{ResHoodOffer.Plyta.ToLower()} 1/1";
//                }
//                else if (hobValue >= 101 && hobValue <= 150)
//                {
//                    return $"{ResHoodOffer.Plyta.ToLower()} 2/1";
//                }
//                else if (hobValue >= 151 && hobValue <= 200)
//                {
//                    return $"{ResHoodOffer.Plyta.ToLower()} 2/2";
//                }
//                else if (hobValue >= 201 && hobValue <= 250)
//                {
//                    return $"{ResHoodOffer.Plyta.ToLower()} 3/2";
//                }
//                else if (hobValue >= 251 && hobValue <= 300)
//                {
//                    return $"{ResHoodOffer.Plyta.ToLower()} 3/3";
//                }
//            }
//            return "";
//        }
//        #endregion
//    }
//}
