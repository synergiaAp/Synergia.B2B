using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
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
    public class InstallationObjectsViewModel
    {
        public List<SelectListItem> InstallationObjectTypes { get; set; }
        public List<SelectListItem> OfferCompanies { get; set; }


        public int? Id { get; set; }

        [Display(Name = "Kod")]
        public string Code { get; set; }

        [Display(Name = "Nazwa")]
        public string Name { get; set; }

        [Display(Name = "Adres")]
        public string Address { get; set; }

        [Display(Name = "Kod pocztowy")]
        public string PostalCode { get; set; }

        [Display(Name = "Miasto")]
        public string City { get; set; }

        [Display(Name = "Kraj")]
        public string Country { get; set; }

        [Display(Name = "Typ")]
        public string Type { get; set; }

        [Display(Name = "Właściciel")]
        public int? IOOfferCompanyId { get; set; }

        [Required]
        public string IOOfferCompanyName { get; set; }

        [Display(Name = "Notatka")]
        public string Note { get; set; }

        public InstallationObjectsViewModel()
        {

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

                //ssd

                OfferCompanies = offerCompanies.Select(c => new SelectListItem()
                {
                    Text = c.Name,
                    Value = c.Id.ToString()
                }).ToList();
            }
        }

    }
}