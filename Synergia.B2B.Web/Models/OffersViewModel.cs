using Synergia.B2B.Common.Dto.Web.Offer;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class OffersViewModel
    {
        public int? OfferId { get; set; }
        public List<InstallationObjectItemDto> OfferInstallationObjectDataItems { get; set; }
        public List<SelectListItem> InstallationObjectTypes { get; set; }
        public List<SelectListItem> Groups { get; set; }
        public List<SelectListItem> Statuses { get; set; }

        [Display(Name = "Logo")]
        public string Logo { get; set; }

        [Required]
        [Display(Name = "Numer oferty")]
        public string OfferNumber { get; set; }

        [Required]
        public decimal CatalogValueNet { get; set; }

        [Required]
        public decimal CatalogValueVat { get; set; }

        [Required]
        public decimal CatalogValueGross { get; set; }

        [Required]
        public decimal ValueAfterPrimatyDiscountNet { get; set; }

        [Required]
        public decimal ValueAfterPrimatyDiscountVat { get; set; }

        [Required]
        public decimal ValueAfterPrimatyDiscountGross { get; set; }

        [Required]
        public decimal FinalValueAfterAllDiscountsNet { get; set; }

        [Required]
        public decimal FinalValueAfterAllDiscountsVat { get; set; }

        [Required]
        public decimal FinalValueAfterAllDiscountsGross { get; set; }

        [Display(Name = "Data")]
        public DateTime? OfferDate { get; set; }

        [Display(Name = "Miasto")]
        public string City { get; set; }

        [Required]
        [Display(Name = "Sprzedawca")]
        public string SellerName { get; set; }

        [Required]
        public int SellerFirmaId { get; set; }

        [Display(Name = "Nabywca")]
        public string OfferCompanyName { get; set; }

        public int? OfferCompanyId { get; set; }

        [Display(Name = "Miasto nabywcy")]
        public string OfferCompanyCity { get; set; }

        [Display(Name = "Kod nabywcy")]
        public string OfferCompanyPostalCode { get; set; }

        [Display(Name = "Adres nabywcy")]
        public string OfferCompanyAddress { get; set; }

        [Display(Name = "NIP nabywcy")]
        public string OfferCompanyNIP { get; set; }

        [Display(Name = "Nazwa")]
        public string InstallationObjectName { get; set; }

        public int? InstallationObjectId { get; set; }

        [Display(Name = "Miasto obiektu")]
        public string InstallationObjectCity { get; set; }

        [Display(Name = "Kod obiektu")]
        public string InstallationObjectPostalCode { get; set; }

        [Display(Name = "Adres obiektu")]
        public string InstallationObjectAddress { get; set; }

        [Display(Name = "Kraj obiektu")]
        public string InstallationObjectCountry { get; set; }

        [Display(Name = "Typ obiektu")]
        public string InstallationObjectType { get; set; }

        [Display(Name = "Status")]
        public string StatusText { get; set; }
        public byte Status { get; set; }
        //public bool IsPrepayment { get; set; }

        [Display(Name = "Zadatek (%)")]
        public byte PrepaymentPercent { get; set; }

        [Display(Name = "Płatność")]
        public OfferPaymentType PaymentType { get; set; }

        public List<SelectListItem> PaymentTypes { get; set; }

        [Display(Name = "Czas realizacji (dni robocze)")]
        public byte DeliveryTimeDays { get; set; }

        [Display(Name = "Gwarancja (lata)")]
        public byte GuaranteeYears { get; set; }

        [Display(Name = "Bez obiektu")]
        public bool WithEmptyInstallationObjectObiektyId { get; set; }

        public bool HasOnlyInnoSavaProducts { get; set; }

        [Display(Name = "Rodzaj dostawy")]
        public OfferDeliveryType DeliveryType { get; set; }

        public List<SelectListItem> DeliveryTypes { get; set; }

        [Display(Name = "Koszt dostawy (zł)")]
        public decimal DeliveryCost { get; set; }

        #region Constructor
        public OffersViewModel()
        {
            if (HttpContext.Current.Session != null)
            {
                OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                List<OfferCompany> offerCompanies = null;
                if (HttpContext.Current.User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    offerCompanies = offerCompanyRepository.GetAll();
                }
                else
                {
                    offerCompanies = offerCompanyRepository.GetByOwner(SessionHelper.LoggedUser.Id).ToList();
                }

                InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
                List<InstallationObject> installationObjects = null;

                if (HttpContext.Current.User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    installationObjects = installationObjectRepository.GetAll();
                }
                else
                {
                    installationObjects = installationObjectRepository.GetByOwner(SessionHelper.LoggedUser.Id).ToList();
                }

                OfferInstallationObjectDataItems = installationObjects.Select(o => new InstallationObjectItemDto()
                {
                    Name = o.Name,
                    Id = o.Id,
                    OfferCompanyId = o.OfferCompanyId
                }).ToList();

                InstallationObjectTypes = new List<SelectListItem>();
                InstallationObjectTypes.Add(new SelectListItem
                {
                    Text = Resources.Common.InstallationObjectType_Gastronomy,
                    Value = "Gastronomia",
                });
                InstallationObjectTypes.Add(new SelectListItem
                {
                    Text = Resources.Common.InstallationObjectType_Other,
                    Value = "Inne",
                });

                Groups = new List<SelectListItem>();
                GroupRepository groupRepository = new GroupRepository();
                List<Group> groups = groupRepository.GetByParId(2200);
                Groups = groups.Select(c => new SelectListItem()
                {
                    Text = c.Code,
                    Value = c.Id.ToString()
                }).ToList();
                Groups.Insert(Groups.Count, new SelectListItem() { Text = "PRODUKTY WŁASNE", Value = "0" });

                Statuses = new List<SelectListItem>();
                List<OfferStatus> statuses = EnumHelper.EnumToListOrdered<OfferStatus>();
                foreach (var statusItem in statuses)
                {
                    Statuses.Add(new SelectListItem()
                    {
                        Text = statusItem.GetDescription(),
                        Value = statusItem.GetValue()
                    });
                }

                PaymentTypes = EnumHelper.EnumToList<OfferPaymentType>()
                    .Select(pt => new SelectListItem()
                    {
                        Text = pt.GetDescription(),
                        Value = pt.GetValue(),
                    })
                    .ToList();

                DeliveryTypes = EnumHelper.EnumToList<OfferDeliveryType>()
                    .Select(pt => new SelectListItem()
                    {
                        Text = pt.GetDescription(),
                        Value = pt.GetValue(),
                    })
                    .ToList();
            }
        }
        #endregion
    }
}
