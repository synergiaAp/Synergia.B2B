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
    public class HoodFinalOfferDetailsViewModel
    {
        public int? HFOOfferId { get; set; }
        public List<InstallationObjectItemDto> OfferInstallationObjectDataItems { get; set; }
        public List<SelectListItem> InstallationObjectTypes { get; set; }
        public List<SelectListItem> Groups { get; set; }
        public List<SelectListItem> Statuses { get; set; }
        public List<SelectListItem> PaymentTypes { get; set; }
        public List<SelectListItem> Regions { get; set; }


        [Display(Name = "Logo")]
        public string HFOLogo { get; set; }

        [Required]
        [Display(Name = "Numer oferty")]
        public string HFOOfferNumber { get; set; }

        [Required]
        public decimal HFOCatalogValueNet { get; set; }

        [Required]
        public decimal HFOCatalogValueVat { get; set; }

        [Required]
        public decimal HFOCatalogValueGross { get; set; }

        [Required]
        public decimal HFOFinalValueAfterAllDiscountsNet { get; set; }

        [Required]
        public decimal HFOFinalValueAfterAllDiscountsVat { get; set; }

        [Required]
        public decimal HFOFinalValueAfterAllDiscountsGross { get; set; }

        [Display(Name = "Data")]
        public DateTime? HFOOfferDate { get; set; }

        [Display(Name = "Miasto")]
        public string HFOCity { get; set; }

        [Display(Name = "Nabywca")]
        public string HFOOfferCompanyName { get; set; }

        public int? HFOOfferCompanyId { get; set; }

        [Display(Name = "Miasto nabywcy")]
        public string HFOOfferCompanyCity { get; set; }

        [Display(Name = "Kod nabywcy")]
        public string HFOOfferCompanyPostalCode { get; set; }

        [Display(Name = "Adres nabywcy")]
        public string HFOOfferCompanyAddress { get; set; }

        [Display(Name = "NIP nabywcy")]
        public string HFOOfferCompanyNIP { get; set; }

        [Display(Name = "Nazwa")]
        public string HFOInstallationObjectName { get; set; }

        public int? HFOInstallationObjectId { get; set; }

        [Display(Name = "Miasto obiektu")]
        public string HFOInstallationObjectCity { get; set; }

        [Display(Name = "Kod obiektu")]
        public string HFOInstallationObjectPostalCode { get; set; }

        [Display(Name = "Adres obiektu")]
        public string HFOInstallationObjectAddress { get; set; }

        [Display(Name = "Kraj obiektu")]
        public string HFOInstallationObjectCountry { get; set; }

        [Display(Name = "Typ obiektu")]
        public string HFOInstallationObjectType { get; set; }

        [Display(Name = "Status")]
        public string HFOStatusText { get; set; }
        public byte HFOStatus { get; set; }

        [Display(Name = "Płatność")]
        public OfferPaymentType HFOPaymentType { get; set; }

        [Display(Name = "Czas realizacji")]
        public string HFODeliveryTime { get; set; }

        [Display(Name = "Okapy")]
        public byte HFOGuaranteeYearsHoods { get; set; }

        [Display(Name = "Nawiewniki")]
        public byte HFOGuaranteeYearsVentilators { get; set; }

        [Display(Name = "CookAir")]
        public byte HFOGuaranteeYearsCookAir { get; set; }

        [Display(Name = "Smoki")]
        public byte HFOGuaranteeYearsSmoki { get; set; }

        [Display(Name = "Ansul")]
        public byte HFOGuaranteeYearsAnsul { get; set; }

        [Display(Name = "KES")]
        public byte HFOGuaranteeYearsKES { get; set; }

        [Display(Name = "Region")]
        public int HFORegionId { get; set; }

        [Display(Name = "Zadatek (%)")]
        public byte HFOPrepaymentPercent { get; set; }
        
        [Display(Name = "Rabat (%)")]
        public decimal HFODiscount { get; set; }

        [Display(Name = "Zapytanie osoba")]
        public string HFOContactPerson { get; set; }

        [EmailAddress]
        [Display(Name = "Zapytanie adres e-mail")]
        public string HFOContactEmail { get; set; }

        [Display(Name = "Zapytanie telefon")]
        public string HFOContactPhone { get; set; }

        [Display(Name = "Uwagi")]
        public string HFOComment { get; set; }

        [Display(Name = "Ukryj rabaty na dokumencie oferty")]
        public bool HFOHideDiscountInPdfFile { get; set; }

        [Display(Name = "Stała wartość netto (zł)")]
        public decimal? HFOFixedValueAfterAllDiscounts { get; set; }

        #region Constructor
        public HoodFinalOfferDetailsViewModel()
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
                        Text = pt.GetDescription().Replace(" (Rabat 2%)", ""),
                        Value = pt.GetValue(),
                    })
                    .ToList();

                List<Region> regions = new RegionRepository().GetAll()
                    .OrderBy(x => x.Code)
                    .ToList();

                Regions = regions.Select(o => new SelectListItem()
                {
                    Text = o.Code,
                    Value = o.Id.ToString()
                }).ToList();
            }
        }
        #endregion
    }
}