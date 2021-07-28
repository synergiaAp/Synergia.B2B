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
//    public class HoodOrderPdfService : PdfService
//    {
//        protected int UserId { get; set; }
//        protected HoodOrder Order { get; set; }
//        protected InstallationObject InstallationObject { get; set; }
//        protected Region Region { get; set; }
//        protected List<pCRM_HoodOrderElements_GridGetHoodOrderElementsList_Result> OrderElements { get; set; }
//        protected OfferCompany Customer { get; set; }
//        protected File OrderLogoFile { get; set; }
//        protected User Owner { get; set; }
//        protected OfferCompany OfferCompany { get; set; }


//        public HoodOrderPdfService(int orderId, int userId)
//            : base()
//        {
//            try
//            {
//                MarginTop = 62f;
//                MarginBottom = 10f;
//                MarginLeft = 5f;
//                MarginRight = 5f;

//                UserId = userId;

//                Order = new HoodOrderRepository().GetById(orderId);
//                InstallationObject = new InstallationObjectRepository().GetById(Order.InstallationObjectId.Value);
//                if (Order.CustomerId.HasValue)
//                {
//                    OfferCompany = new OfferCompanyRepository().GetById(Order.CustomerId.Value);
//                }
//                OrderElements = new HoodOrderElementRepository().GridGetHoodOrderElements(new HoodOrderDetailsListGridParametersDto()
//                {
//                    HoodOrderId = orderId
//                }, UserId).Data as List<pCRM_HoodOrderElements_GridGetHoodOrderElementsList_Result>;
//                Region = new RegionRepository().GetById(Order.RegionId);
//                Customer = new OfferCompanyRepository().GetById(Order.CustomerId.Value);
//                Owner = new UserRepository().GetById(Order.OwnerUserId);
//                OrderLogoFile = Order.LogoFileId.HasValue
//                    ? new FileRepository().GetById(Order.LogoFileId.Value)
//                    : null;

//                FileName = $"Zamówienie okapów {Order.OrderType}/{Order.OrderNumber}/{Order.OrderDate.Value.ToString("yy")}.pdf";
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
//                TemplateContent = TemplateHelper.GetTemplateContent("/Files/HoodOrderPdfFile");
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

//            Replacements.Add("#Logo#", OrderLogoFile != null
//                ? $"{CRMApplicationUrl}Files/GetCRMFile?fileName={OrderLogoFile.GeneratedFileName}"
//                : $"{CRMApplicationUrl}Images/Products/empty_product.png");

//            Replacements.Add("#OrderNumber#", $"{Order.OrderType}/{Order.OrderNumber}/{Order.OrderDate.Value.ToString("yy")}");
//            Replacements.Add("#InstallationObject#", $"{InstallationObject?.Name} {InstallationObject?.Address}");
//            Replacements.Add("#ContactPerson#", Order.ContactPerson);
//            Replacements.Add("#ContactEmail#", Order.ContactEmail);
//            Replacements.Add("#ContactPhone#", Order.ContactPhone);

//            Replacements.Add("#Date#", Order.OrderDate?.ToString(DateTimeHelper.SynergiaDateFormat));
//            Replacements.Add("#InstallationObjectCity#", InstallationObject.City);
//            Replacements.Add("#CatalogValueNet#", Order.CatalogValue.ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#CatalogValueGross#", (Order.CatalogValue + Order.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#CatalogValueVat#", (Order.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsNet#", Order.FinalValueAfterAllDiscounts.ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsGross#",
//                (Order.FinalValueAfterAllDiscounts + Order.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#FinalValueAfterAllDiscountsVat#", (Order.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
//            Replacements.Add("#DeliveryTime#", Order.DeliveryTime);
//            Replacements.Add("#PrepaymentPercent#", Order.PrepaymentPercent.ToString());
//            Replacements.Add("#RestPaymentPercent#", (100 - Order.PrepaymentPercent).ToString());
//            Replacements.Add("#GuaranteeMonthsAnsul#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsAnsul * 12));
//            Replacements.Add("#GuaranteeMonthsCookAir#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsCookAir * 12));
//            Replacements.Add("#GuaranteeMonthsHoods#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsHoods * 12));
//            Replacements.Add("#GuaranteeMonthsKES#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsKES * 12));
//            Replacements.Add("#GuaranteeMonthsSmoki#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsSmoki * 12));
//            Replacements.Add("#GuaranteeMonthsVentilators#", DateTimeHelper.GetMonthsCountText(Order.GuaranteeYearsVentilators * 12));
//            Replacements.Add("#OfferCompanyId#", OfferCompany?.Id.ToString());
//            Replacements.Add("#OfferCompanyName#", OfferCompany?.Name);
//            Replacements.Add("#OfferCompanyAddress#", $"{OfferCompany?.Address}, {OfferCompany?.PostalCode} {OfferCompany?.City}".Trim(new char[] { ' ', ',' }));
//            Replacements.Add("#OfferCompanyNIP#", OfferCompany?.NIP);

//            Replacements.Add("#RegionNameRZ#", Convert.ToByte(Region.Code == "RZ").ToString());
//            Replacements.Add("#RegionNameRW#", Convert.ToByte(Region.Code == "RW").ToString());
//            Replacements.Add("#RegionNameRP#", Convert.ToByte(Region.Code == "RP").ToString());
//            Replacements.Add("#RegionNameRG#", Convert.ToByte(Region.Code == "RG").ToString());

//            Replacements.Add("#HasAnyHood#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Hood.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnySmoki#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyAnsul#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Ansul.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyVentilator#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Ventilator.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyCookAir#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.CookAir.ToByte()).Any()).ToString());
//            Replacements.Add("#HasAnyKES#", Convert.ToByte(OrderElements.Where(x => x.Type == HoodFinalOfferElementType.KES.ToByte()).Any()).ToString());

//            List<string> installationTypes = new List<string>();
//            if (OrderElements.Where(x => !(x.Type == HoodFinalOfferElementType.Smoki.ToByte()
//                 && !string.IsNullOrEmpty(x.ProductName) && x.ProductName.ToLower().Contains("junior"))).Any())
//            {
//                installationTypes.Add("powietrznej");
//            }
//            if (OrderElements.Where(x => x.Type != HoodFinalOfferElementType.Ventilator.ToByte()
//                    && x.Type != HoodFinalOfferElementType.Ansul.ToByte()).Any())
//            {
//                installationTypes.Add("elektrycznej");
//            }
//            if (OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()
//                 && !string.IsNullOrEmpty(x.ProductName) && x.ProductName.ToLower().Contains("junior")).Any())
//            {
//                installationTypes.Add("dymowej");
//            }
//            if (OrderElements.Where(x => x.Type == HoodFinalOfferElementType.Smoki.ToByte()).Any())
//            {
//                installationTypes.Add("wodnej i kanalizacji sanitarnej");
//            }
//            Replacements.Add("#InstallationTypes#", string.Join(", ", installationTypes));

//            if (Order.PaymentType == OfferPaymentType.BeforeDelivery.ToByte())
//            {
//                Replacements.Add("#PaymentDeadline#", "w przededniu ekspedycji");
//            }
//            else
//            {
//                Replacements.Add("#PaymentDeadline#", $"do {((OfferPaymentType)Order.PaymentType).GetDescription().Replace("Przelew", "").Trim()} po dostawie");
//            }

//            string orderElementRow = TemplateContent.Substring(
//                               TemplateContent.IndexOf("<!--BeginHoodOrderElementRow-->"),
//                               TemplateContent.LastIndexOf("<!--EndHoodOrderElementRow-->") - TemplateContent.IndexOf("<!--BeginHoodOrderElementRow-->")
//                           );

//            StringBuilder sbOrderElementRows = new StringBuilder();
//            int index = 1;
//            foreach (var orderElement in OrderElements)
//            {
//                sbOrderElementRows.Append(
//                    orderElementRow.Replace("#No#", index.ToString())
//                    .Replace("#ProductCode#", orderElement.ProductCode)
//                    .Replace("#ProductName#", orderElement.ProductName)
//                    .Replace("#Quantity#", orderElement.Quantity.ToString())
//                    .Replace("#CatalogPriceNet#", orderElement.CatalogPriceNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#TotalCatalogPriceNet#", (orderElement.CatalogPriceNet * orderElement.Quantity).ToString2DecimalPlacesWithSpaces())
//                    .Replace("#Discount#", orderElement.Discount.ToString1DecimalPlace())
//                    .Replace("#PriceAfterDiscountNet#", orderElement.PriceAfterDiscountNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#FinalValueNet#", orderElement.FinalValueNet.ToString2DecimalPlacesWithSpaces())
//                    .Replace("#ProductImage#", GetProductImage(orderElement))
//                    );
//                index++;
//            }

//            Replacements.Add(orderElementRow, sbOrderElementRows.ToString().ReplaceNewLineToEmpty());
//            Replacements.Add("#ShowDiscountInPdfFile#", !Order.HideDiscountInPdfFile ? "1" : "0");
//        }

//        private string GetProductImage(pCRM_HoodOrderElements_GridGetHoodOrderElementsList_Result orderElement)
//        {
//            if (!string.IsNullOrEmpty(orderElement.FileName))
//            {
//                return $"{CRMApplicationUrl}Files/GetFile?fileName={orderElement.FileName}";
//            }
//            else
//            {
//                string fileName = null;
//                if (orderElement.Type == (byte)HoodFinalOfferElementType.Hood)
//                {
//                    fileName = SynergiaHelper.GetHoodFileName(orderElement.ProductCode);
//                    if (!string.IsNullOrEmpty(fileName))
//                    {
//                        return $"{CRMApplicationUrl}/Images/HoodOffer/Hoods/{fileName}";
//                    }
//                }
//                else
//                {
//                    fileName = SynergiaHelper.GetHoodAccessoryFileName(orderElement.ProductCode);
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
