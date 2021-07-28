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
    public class FinishedOfferPdfService : PdfService
    {
        protected int UserId { get; set; }
        protected Offer Offer { get; set; }
        protected List<pCRM_OfferElements_GridGetOfferElementsList_Result> OfferElements { get; set; }
        protected Customer Seller { get; set; }
        protected OfferCompany Customer { get; set; }
        protected File OfferLogoFile { get; set; }
        protected User Owner { get; set; }

        public FinishedOfferPdfService(int offerId, int userId)
            : base("FinishedOffer.html")
        {
            try
            {
                UserId = userId;

                Offer = new OfferRepository().GetById(offerId);
                OfferElements = new OfferElementRepository().GridGetOfferElements(new OfferDetailsListGridParametersDto()
                {
                    OfferId = offerId
                }, UserId).Data as List<pCRM_OfferElements_GridGetOfferElementsList_Result>;

                Seller = new CustomerRepository().GetById(Offer.SellerFirmaId);
                Customer = new OfferCompanyRepository().GetById(Offer.CustomerOfferCompanyId.Value);
                Owner = new UserRepository().GetById(Offer.OwnerUserId);
                OfferLogoFile = Offer.LogoFileId.HasValue
                    ? new FileRepository().GetById(Offer.LogoFileId.Value)
                    : null;

                FileName = string.Format("Oferta OFE/{0}.pdf", Offer.OfferNumber);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }

        protected override void ConfigureReplacements()
        {
            base.ConfigureReplacements();

            Replacements.Add("#Logo#", OfferLogoFile != null
                ? $"{CRMApplicationUrl}Files/GetCRMFile?fileName={OfferLogoFile.GeneratedFileName}"
                : $"{CRMApplicationUrl}Images/Products/empty_product.png");

            Replacements.Add("#OfferNumber#", Offer.OfferNumber);
            Replacements.Add("#Date#", Offer.OfferDate?.ToString(DateTimeHelper.UniversalDateFormat));
            Replacements.Add("#City#", Offer.City);
            Replacements.Add("#CatalogValueNet#", Offer.CatalogValue.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#CatalogValueGross#", (Offer.CatalogValue + Offer.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#CatalogValueVat#", (Offer.CatalogValue * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountNet#", Offer.ValueAfterPrimatyDiscount.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountGross#",
                (Offer.ValueAfterPrimatyDiscount + Offer.ValueAfterPrimatyDiscount * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#ValueAfterPrimaryDiscountVat#", (Offer.ValueAfterPrimatyDiscount * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsNet#", Offer.FinalValueAfterAllDiscounts.ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsGross#",
                (Offer.FinalValueAfterAllDiscounts + Offer.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#FinalValueAfterAllDiscountsVat#", (Offer.FinalValueAfterAllDiscounts * 0.23M).ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#SummaryProductPowerGasSum#", OfferElements.Select(oe => oe.ProductPowerGasSum).Sum().ToString2DecimalPlacesWithSpaces());
            Replacements.Add("#SummaryProductPowerElectricitySum#", OfferElements.Select(oe => oe.ProductPowerElectricitySum).Sum().ToString2DecimalPlacesWithSpaces());

            Replacements.Add("#SellerName#", Seller.Name);
            Replacements.Add("#SellerAddress#", $"{Seller.PostalCode} {Seller.City}, {Seller.Street} {Seller.House}"
                + (!string.IsNullOrEmpty(Seller.Apartment) ? "/" + Seller.Apartment : ""));
            Replacements.Add("#SellerNIP#", Seller.NIP);
            Replacements.Add("#SellerPhone#", "-");
            Replacements.Add("#SellerFax#", "-");
            Replacements.Add("#CustomerName#", Customer.Name);
            Replacements.Add("#CustomerAddress#", $"{Customer.PostalCode} {Customer.City}, {Customer.Address}");
            Replacements.Add("#CustomerNIP#", Customer.NIP);
            Replacements.Add("#DeliveryTimeDays#", DeliveryTimeDaysHelper.GetReplacement(OfferElements.Select((x, itemIndex) => new DeliveryTimeDaysItem()
            {
                DeliveryTimeDays = x.DeliveryTimeDays,
                Position = itemIndex + 1
            }).ToList()));
            Replacements.Add("#PrepaymentPercent#", Offer.PrepaymentPercent.ToString());
            Replacements.Add("#RestOfPaymentPercent#", (100 - Offer.PrepaymentPercent).ToString());
            Replacements.Add("#PaymentType#", ((OfferPaymentType)Offer.PaymentType).GetDescription());
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


            string offerElementRow = TemplateContent.Substring(
                               TemplateContent.IndexOf("<!--BeginOfferElementRow-->"),
                               TemplateContent.LastIndexOf("<!--EndOfferElementRow-->") - TemplateContent.IndexOf("<!--BeginOfferElementRow-->")
                           );

            if (Offer.DeliveryCost > 0)
            {
                OfferElements.Add(new pCRM_OfferElements_GridGetOfferElementsList_Result()
                {
                    FinalValueNet = Offer.DeliveryCost,
                    PriceAfterDiscountNet = Offer.DeliveryCost,
                    ProductName = "Dostawa",
                    Quantity = 1
                });
            }

            StringBuilder sbOfferElementRows = new StringBuilder();
            int index = 1;
            foreach (var offerElement in OfferElements)
            {
                sbOfferElementRows.Append(
                    offerElementRow.Replace("#No#", index.ToString())
                    .Replace("#ProductCode#", offerElement.ProductCode)
                    .Replace("#ProductName#", offerElement.ProductName)
                    .Replace("#ProductDimensions#", offerElement.ProductDimensions)
                    .Replace("#Quantity#", offerElement.Quantity.ToString())
                    //.Replace("#ProductTerminal#", offerElement.ProductTerminal)
                    //.Replace("#ProductPowerGas#", offerElement.ProductPowerGas.ToString2DecimalPlacesWithSpaces())
                    //.Replace("#ProductPowerGasSum#", offerElement.ProductPowerGasSum.ToString2DecimalPlacesWithSpaces())
                    //.Replace("#ProductPowerElectricity#", offerElement.ProductPowerElectricity.ToString2DecimalPlacesWithSpaces())
                    //.Replace("#ProductPowerElectricitySum#", offerElement.ProductPowerElectricitySum.ToString2DecimalPlacesWithSpaces())
                    .Replace("#PriceAfterDiscountNet#", offerElement.PriceAfterDiscountNet.ToString2DecimalPlacesWithSpaces())
                    .Replace("#FinalValueNet#", offerElement.FinalValueNet.ToString2DecimalPlacesWithSpaces())
                    .Replace("#ProductImage#", !string.IsNullOrEmpty(offerElement.FileName)
                        ? $"{CRMApplicationUrl}Files/GetFile?fileName={offerElement.FileName}"
                        : $"{CRMApplicationUrl}Images/Products/empty_product.png")
                    .Replace("#ProductClass#", offerElement.Id == 0 ? "hidden" : "")
                    );
                index++;
            }

            Replacements.Add(offerElementRow, sbOfferElementRows.ToString().ReplaceNewLineToEmpty());
            Replacements.Add("#HasOnlyInnoSavaProductsClass#", Offer.HasOnlyInnoSavaProducts ? "hidden" : "");
        }
    }
}
