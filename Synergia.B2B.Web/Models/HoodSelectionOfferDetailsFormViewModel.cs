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
    public class HoodSelectionOfferDetailsFormViewModel
    {
        public List<SelectListItem> InstallationObjects { get; set; }
        public List<SelectListItem> InstallationObjectTypes { get; set; }
        public List<SelectListItem> Regions { get; set; }
        public List<SelectListItem> Languages { get; set; }

        public int? HoodOfferId { get; set; }

        [Display(Name = "Nazwa")]
        public string HoodInstallationObjectName { get; set; }

        public int? HoodInstallationObjectId { get; set; }

        [Display(Name = "Miasto obiektu")]
        public string HoodInstallationObjectCity { get; set; }

        [Display(Name = "Kod obiektu")]
        public string HoodInstallationObjectPostalCode { get; set; }

        [Display(Name = "Adres obiektu")]
        public string HoodInstallationObjectAddress { get; set; }

        [Display(Name = "Kraj obiektu")]
        public string HoodInstallationObjectCountry { get; set; }

        [Display(Name = "Typ obiektu")]
        public string HoodInstallationObjectType { get; set; }

        [Display(Name = "Numer oferty")]
        public string HoodOfferNumber { get; set; }

        [Display(Name = "Status")]
        public string HoodStatusText { get; set; }
        public byte HoodStatus { get; set; }

        [Display(Name = "Zapytanie osoba")]
        public string HoodOfferContactPerson { get; set; }

        [EmailAddress]
        [Display(Name = "Zapytanie adres e-mail")]
        public string HoodOfferContactEmail { get; set; }

        [Display(Name = "Zapytanie telefon")]
        public string HoodOfferContactPhone { get; set; }

        [Required]
        [Display(Name = "Region")]
        public int? HoodOfferRegionId { get; set; }

        [Display(Name = "Komentarz")]
        public string Comment { get; set; }

        [Display(Name = "Język")]
        public int? LanguageId { get; set; }


        #region Constructor
        public HoodSelectionOfferDetailsFormViewModel()
        {
            if (HttpContext.Current.Session != null)
            {
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

                InstallationObjects = installationObjects.Select(o => new SelectListItem()
                {
                    Text = o.Name,
                    Value = o.Id.ToString()
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

                RegionRepository regionRepository = new RegionRepository();
                List<Region> regions = regionRepository.GetAll();

                Regions = regions.Select(o => new SelectListItem()
                {
                    Text = o.Code,
                    Value = o.Id.ToString()
                }).ToList();


                var languages = new LanguageRepository().GetAll();
                Languages = languages.OrderBy(x => x.Name).Select(o => new SelectListItem()
                {
                    Text = o.Name,
                    Value = o.Id.ToString()
                }).ToList();
            }
        }
        #endregion
    }
}