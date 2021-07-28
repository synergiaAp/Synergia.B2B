//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Services.Pdf
//{
//    public class FinishedHoodFinalOfferPdfService : PdfService
//    {
//        protected int UserId { get; set; }
//        protected HoodFinalOffer Offer { get; set; }
//        protected InstallationObject InstallationObject { get; set; }
//        protected Region Region { get; set; }
//        protected List<pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList_Result> OfferElements { get; set; }
//        protected File OfferLogoFile { get; set; }
//        protected User Owner { get; set; }
//        protected OfferCompany OfferCompany { get; set; }

//        public FinishedHoodFinalOfferPdfService(int hoodFinalOfferId, int userId)
//            : base()
//        {
//            try
//            {
//                MarginTop = 62f;
//                MarginBottom = 10f;
//                MarginLeft = 5f;
//                MarginRight = 5f;

//                UserId = userId;

//                Offer = new HoodFinalOfferRepository().GetById(hoodFinalOfferId);
//                InstallationObject = new InstallationObjectRepository().GetById(Offer.InstallationObjectObiektyId.Value);
//                if (Offer.CustomerOfferCompanyId.HasValue)
//                {
//                    OfferCompany = new OfferCompanyRepository().GetById(Offer.CustomerOfferCompanyId.Value);
//                }
//                OfferElements = new HoodFinalOfferElementRepository().GridGetHoodFinalOfferElements(new HoodFinalOfferDetailsListGridParametersDto()
//                {
//                    HoodFinalOfferId = hoodFinalOfferId
//                }, UserId).Data as List<pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList_Result>;
//                Region = new RegionRepository().GetById(Offer.RegionId);
//                Owner = new UserRepository().GetById(Offer.OwnerUserId);
//                OfferLogoFile = Offer.LogoFileId.HasValue
//                    ? new FileRepository().GetById(Offer.LogoFileId.Value)
//                    : null;

//                FileName = string.Format($"Oferta cenowa JE{SynergiaHelper.GetHoodFinalOfferNumber(Offer.OfferNumber, Region.Code)}.pdf", Offer.OfferNumber);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }

//        protected override void LoadTemplateContent()
//        {
//            try
//            {
//                TemplateContent = TemplateHelper.GetTemplateContent("/Files/HoodFinalOfferPdfFile");
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }

//        protected override void ConfigureReplacements()
//        {
//            base.ConfigureReplacements();

//            Replacements.Add("#OfferNumber#", SynergiaHelper.GetHoodFinalOfferNumber(Offer.OfferNumber, Region.Code));
//            Replacements.Add("#InstallationObject#", $"{InstallationObject?.Name} {InstallationObject?.Address}");
//            Replacements.Add("#ContactPerson#", Offer.ContactPerson);
//            Replacements.Add("#ContactEmail#", Offer.ContactEmail);
//            Replacements.Add("#ContactPhone#", Offer.ContactPhone);
//            Replacements.Add("#Date#", Offer.OfferDate?.ToString(DateTimeHelper.SynergiaDateFormat));
//            Replacements.Add("#InstallationObjectCity#", InstallationObject.City);
//            Replacements.Add("#CatalogValueNet#", Offer.CatalogValue.ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#CatalogValueGross#", (Offer.CatalogValue + Offer.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#CatalogValueVat#", (Offer.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsNet#", Offer.FinalValueAfterAllDiscounts.ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsGross#",
//                (Offer.FinalValueAfterAllDiscounts + Offer.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsVat#", (Offer.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#DeliveryTime#", Offer.DeliveryTime);
//            Replacements.Add("#PrepaymentPercent#", Offer.PrepaymentPercent.ToString());
//            Replacements.Add("#RestPaymentPercent#", (100 - Offer.PrepaymentPercent).ToString());
//            Replacements.Add("#GuaranteeMonthsAnsul#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsAnsul * 12));
//            Replacements.Add("#GuaranteeMonthsCookAir#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsCookAir * 12));
//            Replacements.Add("#GuaranteeMonthsHoods#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsHoods * 12));
//            Replacements.Add("#GuaranteeMonthsKES#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsKES * 12));
//            Replacements.Add("#GuaranteeMonthsSmoki#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsSmoki * 12));
//            Replacements.Add("#GuaranteeMonthsVentilators#", DateTimeHelper.GetMonthsCountText(Offer.GuaranteeYearsVentilators * 12));
//            Replacements.Add("#OfferCompanyId#", OfferCompany?.Id.ToString());
//            Replacements.Add("#OfferCompanyName#", OfferCompany?.Name);
//            Replacements.Add("#OfferCompanyAddress#", $"{OfferCompany?.Address}, {OfferCompany?.PostalCode} {OfferCompany?.City}".Trim(new char[] { ' ', ','}));
//            Replacements.Add("#OfferCompanyNIP#", OfferCompany?.NIP);

//            Replacements.Add("#RegionNameRZ#", Convert.ToByte(Region.Code == "RZ").ToString());
//            Replacements.Add("#RegionNameRW#", Convert.ToByte(Region.Code == "RW").ToString());
//            Replacements.Add("#RegionNameRP#", Convert.ToByte(Region.Code == "RP").ToString());
//            Replacements.Add("#RegionNameRG#", Convert.ToByte(Region.Code == "RG").ToString());

//            Replacements.Add("#HasAnyHood#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Hood.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnySmoki#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyAnsul#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Ansul.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyVentilator#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Ventilator.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyCookAir#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.CookAir.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyKES#", Convert.ToByte(OfferElements.Where(x => x.Type == HoodFinalOfferElementType.KES.ToByte()).Any()).ToString());

//            List<string> installationTypes = new List<string>();
//            if (OfferElements.Where(x => !(x.Type == HoodFinalOfferElementType.Smoki.ToByte()
//                 && !string.IsNullOrEmpty(x.ProductName) && x.ProductName.ToLower().Contains("junior"))).Any())
//            {
//                installationTypes.Add("powietrznej");
//            }
//            if (OfferElements.Where(x => x.Type != HoodFinalOfferElementType.Ventilator.ToByte()
//                    && x.Type != HoodFinalOfferElementType.Ansul.ToByte()).Any())
//            {
//                installationTypes.Add("elektrycznej");
//            }
//            if (OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()
//                 && !string.IsNullOrEmpty(x.ProductName) && x.ProductName.ToLower().Contains("junior")).Any())
//            {
//                installationTypes.Add("dymowej");
//            }
//            if (OfferElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()).Any())
//            {
//                installationTypes.Add("wodnej i kanalizacji sanitarnej");
//            }
//            Replacements.Add("#InstallationTypes#", string.Join(", ", installationTypes));

//            if (Offer.PaymentType == OfferPaymentType.BeforeDelivery.ToByte())
//            {
//                Replacements.Add("#PaymentDeadline#", "w przededniu ekspedycji");
//            }
//            else
//            {
//                Replacements.Add("#PaymentDeadline#", $"do {((OfferPaymentType)Offer.PaymentType).GetDescription().Replace("Przelew", "").Trim()} po dostawie");
//            }

//            string offerElementRow = TemplateContent.Substring(
//                               TemplateContent.IndexOf("<!--BeginOfferElementRow-->"),
//                               TemplateContent.LastIndexOf("<!--EndOfferElementRow-->") - TemplateContent.IndexOf("<!--BeginOfferElementRow-->")
//                           );

//            StringBuilder sbOfferElementRows = new StringBuilder();
//            int index = 1;
//            foreach (var offerElement in OfferElements)
//            {
//                sbOfferElementRows.Append(
//                    offerElementRow.Replace("#No#", index.ToString())
//                    .Replace("#ProductCode#", offerElement.ProductCode)
//                    .Replace("#ProductName#", offerElement.ProductName)
//                    .Replace("#Quantity#", offerElement.Quantity.ToString())
//                    .Replace("#CatalogPriceNet#", offerElement.CatalogPriceNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#TotalCatalogPriceNet#", (offerElement.CatalogPriceNet * offerElement.Quantity).ToString2DecimalPlacesWithSpaces())
//                    .Replace("#Discount#", offerElement.Discount.ToString1DecimalPlace())
//                    .Replace("#PriceAfterDiscountNet#", offerElement.PriceAfterDiscountNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#FinalValueNet#", offerElement.FinalValueNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#ProductImage#", GetProductImage(offerElement))
//                    );
//                index++;
//            }

//            Replacements.Add(offerElementRow, sbOfferElementRows.ToString().ReplaceNewLineToEmpty());
//            Replacements.Add("#ShowDiscountInPdfFile#", !Offer.HideDiscountInPdfFile ? "1" : "0");
//        }

//        private string GetProductImage(pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList_Result offerElement)
//        {
//            if (!string.IsNullOrEmpty(offerElement.FileName))
//            {
//                return $"{CRMApplicationUrl}Files/GetFile?fileName={offerElement.FileName}";
//            }
//            else
//            {
//                string fileName = null;
//                if (offerElement.Type == (byte)HoodFinalOfferElementType.Hood)
//                {
//                    fileName = SynergiaHelper.GetHoodFileName(offerElement.ProductCode);
//                    if (!string.IsNullOrEmpty(fileName))
//                    {
//                        return $"{CRMApplicationUrl}/Images/HoodOffer/Hoods/{fileName}";
//                    }
//                }
//                else
//                {
//                    fileName = SynergiaHelper.GetHoodAccessoryFileName(offerElement.ProductCode);
//                    if (!string.IsNullOrEmpty(fileName))
//                    {
//                        return $"{CRMApplicationUrl}/Images/HoodOffer/Accessories/{fileName}";
//                    }
//                }
//                return $"{CRMApplicationUrl}Images/Products/empty_product.png";
//            }
//        }
//    }
//}
