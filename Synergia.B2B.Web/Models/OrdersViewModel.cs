using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
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
    public class OrdersViewModel
    {
        public int? OrderId { get; set; }
        public List<SelectListItem> OfferCompanyNames { get; set; }
        public List<SelectListItem> OfferInstallationObjectData { get; set; }
        public List<SelectListItem> InstallationObjectTypes { get; set; }
        public List<SelectListItem> Groups { get; set; }

        [Display(Name = "Logo")]
        public string Logo { get; set; }

        [Required]
        [Display(Name = "Numer zamówienia")]
        public string OrderNumber { get; set; }

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
        public DateTime? OrderDate { get; set; }

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

        [Display(Name = "Właściciel obiektu")]
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

        [Display(Name = "Przedpłata (2%)")]
        public bool IsPrepayment { get; set; }

        [Display(Name = "Status")]
        public string StatusText { get; set; }
        public byte Status { get; set; }
        public OrdersViewModel()
        {
            if (HttpContext.Current.Session != null)
            {
                OfferCompanyNames = new List<SelectListItem>();

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

                OfferCompanyNames = offerCompanies.Select(c => new SelectListItem()
                {
                    Text = c.Name,
                    Value = c.Id.ToString()
                }).ToList();


                OfferInstallationObjectData = new List<SelectListItem>();
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

                OfferInstallationObjectData = installationObjects.Select(c => new SelectListItem()
                {
                    Text = c.Name,
                    Value = c.Id.ToString()
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
            }
        }
    }
}