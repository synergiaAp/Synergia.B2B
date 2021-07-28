using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Services.Pdf
{
    public class OrderPdfService : PdfService
    {
        protected int UserId { get; set; }
        protected Order Order { get; set; }
        protected List<pCRM_OrderElements_GridGetOrderElementsList_Result> OrderElements { get; set; }
        protected Customer Seller { get; set; }
        protected OfferCompany Customer { get; set; }
        protected File OrderLogoFile { get; set; }
        protected User Owner { get; set; }

        public OrderPdfService(int orderId, int userId)
            : base("Order.html")
        {
            try
            {
                UserId = userId;

                Order = new OrderRepository().GetById(orderId);
                OrderElements = new OrderElementRepository().GridGetOrderElements(new OrderDetailsListGridParametersDto()
                {
                    OrderId = orderId
                }, UserId).Data as List<pCRM_OrderElements_GridGetOrderElementsList_Result>;

                Seller = new CustomerRepository().GetById(Order.SellerFirmaId);
                Customer = new OfferCompanyRepository().GetById(Order.CustomerOfferCompanyId.Value);
                Owner = new UserRepository().GetById(Order.OwnerUserId);
                OrderLogoFile = Order.LogoFileId.HasValue
                    ? new FileRepository().GetById(Order.LogoFileId.Value)
                    : null;

                FileName = string.Format("Zamówienie ZAM/{0}.pdf", Order.OrderNumber);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }

        protected override void ConfigureReplacements()
        {
            base.ConfigureReplacements();

            Replacements.Add("#Logo#", OrderLogoFile != null
                ? $"{CRMApplicationUrl}Files/GetCRMFile?fileName={OrderLogoFile.GeneratedFileName}"
                : $"{CRMApplicationUrl}Images/Products/empty_product.png");

            Replacements.Add("#OrderNumber#", Order.OrderNumber);
            Replacements.Add("#Date#", Order.OrderDate?.ToString(DateTimeHelper.UniversalDateFormat));
            Replacements.Add("#City#", Order.City);
            Replacements.Add("#CatalogValueNet#", Order.CatalogValue.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#CatalogValueGross#", (Order.CatalogValue + Order.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#CatalogValueVat#", (Order.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountNet#", Order.ValueAfterPrimatyDiscount.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountGross#",
                (Order.ValueAfterPrimatyDiscount + Order.ValueAfterPrimatyDiscount * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountVat#", (Order.ValueAfterPrimatyDiscount * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsNet#", Order.FinalValueAfterAllDiscounts.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsGross#",
                (Order.FinalValueAfterAllDiscounts + Order.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsVat#", (Order.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#SummaryProductPowerGasSum#", OrderElements.Select(oe => oe.ProductPowerGasSum).Sum().ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#SummaryProductPowerElectricitySum#", OrderElements.Select(oe => oe.ProductPowerElectricitySum).Sum().ToString2DecimalPlacesWithSpaces());

            Replacements.Add("#SellerName#", Seller.Name);
            Replacements.Add("#SellerAddress#", $"{Seller.PostalCode} {Seller.City}, {Seller.Street} {Seller.House}"
                + (!string.IsNullOrEmpty(Seller.Apartment) ? "/" + Seller.Apartment : ""));
            Replacements.Add("#SellerNIP#", Seller.NIP);
            Replacements.Add("#SellerPhone#", "-");
            Replacements.Add("#SellerFax#", "-");
            Replacements.Add("#CustomerName#", Customer.Name);
            Replacements.Add("#CustomerAddress#", $"{Customer.PostalCode} {Customer.City}, {Customer.Address}");
            Replacements.Add("#CustomerNIP#", Customer.NIP);
            Replacements.Add("#DeliveryTimeDays#", DeliveryTimeDaysHelper.GetReplacement(OrderElements.Select((x, itemIndex) => new DeliveryTimeDaysItem()
            {
                DeliveryTimeDays = x.DeliveryTimeDays,
                Position = itemIndex + 1
            }).ToList()));
            Replacements.Add("#PrepaymentPercent#", Order.PrepaymentPercent.ToString());
            Replacements.Add("#RestOfPaymentPercent#", (100 - Order.PrepaymentPercent).ToString());
            Replacements.Add("#PaymentType#", ((OfferPaymentType)Order.PaymentType).GetDescription());
            Replacements.Add("#FirstName#", Owner.FirstName);
            Replacements.Add("#Surname#", Owner.Surname);
            Replacements.Add("#Mail#", Owner.Login);
            Replacements.Add("#Position#", Owner.Position);
            if (string.IsNullOrEmpty(Owner.Phone))
            {
                string phoneRow = TemplateContent.Substring(
                               TemplateContent.IndexOf("<!--BeginPhoneRow-->"),
                               TemplateContent.LastIndexOf("<!--EndPhoneRow-->") - TemplateContent.IndexOf("<!--BeginPhoneRow-->")
                           );
                Replacements.Add(phoneRow, "");
            }
            else
            {
                Replacements.Add("#Phone#", Owner.Phone);
            }


            string orderElementRow = TemplateContent.Substring(
                               TemplateContent.IndexOf("<!--BeginOrderElementRow-->"),
                               TemplateContent.LastIndexOf("<!--EndOrderElementRow-->") - TemplateContent.IndexOf("<!--BeginOrderElementRow-->")
                           );

            if (Order.DeliveryCost > 0)
            {
                OrderElements.Add(new pCRM_OrderElements_GridGetOrderElementsList_Result()
                {
                    FinalValueNet = Order.DeliveryCost,
                    PriceAfterDiscountNet = Order.DeliveryCost,
                    ProductName = "Dostawa",
                    Quantity = 1
                });
            }

            StringBuilder sbOrderElementRows = new StringBuilder();
            int index = 1;
            foreach (var orderElement in OrderElements)
            {
                sbOrderElementRows.Append(
                    orderElementRow.Replace("#No#", index.ToString())
                    .Replace("#ProductCode#", orderElement.ProductCode)
                    .Replace("#ProductName#", orderElement.ProductName)
                    .Replace("#ProductDimensions#", orderElement.ProductDimensions)
                    .Replace("#Quantity#", orderElement.Quantity.ToString())
                    .Replace("#ProductTerminal#", orderElement.ProductTerminal)
                    .Replace("#ProductPowerGas#", orderElement.ProductPowerGas.ToString2DecimalPlacesWithSpaces())
                    .Replace("#ProductPowerGasSum#", orderElement.ProductPowerGasSum.ToString2DecimalPlacesWithSpaces())
                    .Replace("#ProductPowerElectricity#", orderElement.ProductPowerElectricity.ToString2DecimalPlacesWithSpaces())
                    .Replace("#ProductPowerElectricitySum#", orderElement.ProductPowerElectricitySum.ToString2DecimalPlacesWithSpaces())
                    .Replace("#PriceAfterDiscountNet#", orderElement.PriceAfterDiscountNet.ToString2DecimalPlacesWithSpaces())
                    .Replace("#FinalValueNet#", orderElement.FinalValueNet.ToString2DecimalPlacesWithSpaces())
                    .Replace("#ProductImage#", !string.IsNullOrEmpty(orderElement.FileName)
                        ? $"{CRMApplicationUrl}Files/GetFile?fileName={orderElement.FileName}"
                        : $"{CRMApplicationUrl}Images/Products/empty_product.png")
                    .Replace("#ProductClass#", orderElement.Id == 0 ? "hidden" : "")
                    );
                index++;
            }

            Replacements.Add(orderElementRow, sbOrderElementRows.ToString().ReplaceNewLineToEmpty());
            Replacements.Add("#HasOnlyInnoSavaProductsClass#", Order.HasOnlyInnoSavaProducts ? "hidden" : "");
        }
    }
}
