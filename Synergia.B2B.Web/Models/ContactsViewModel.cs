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
    public class ContactsViewModel
    {
        public List<SelectListItem> CustomerTypes { get; set; }

        [Display(Name = "Klient")]
        public List<SelectListItem> OfferCompanyNames { get; set; }

        public int? Id { get; set; }

        [Display(Name = "Imię")]
        public string FirstName { get; set; }

        [Display(Name = "Nazwisko")]
        public string Surname { get; set; }

        [Display(Name = "Telefon komórkowy")]
        public string MobilePhone { get; set; }

        [Display(Name = "Telefon stacjonarny")]
        public string LandlinePhone { get; set; }

        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Data urodzenia")]
        public DateTime? BirthDate { get; set; }

        [Display(Name = "Typ klienta")]
        public string CustomerType { get; set; }

        [Display(Name = "Stanowisko")]
        public string Position { get; set; }

        [Display(Name = "Zainteresowania")]
        public string Interests { get; set; }

        [Display(Name = "Przypomnienie o urodzinach")]
        public bool BirthdayReminder { get; set; }

        [Display(Name = "Nastawienie")]
        public string Attitude { get; set; }

        [Display(Name = "Komentarz")]
        public string Comment { get; set; }

        [Display(Name = "Data ostatniego kontaktu")]
        public DateTime? LastContact { get; set; }

        [Display(Name = "Status")]
        public byte? Status { get; set; }

        [Required]
        [Display(Name = "Klient")]
        public string OffersCompanyName { get; set; }

        [Required]
        public int? OffersCompanyId { get; set; }

        public ContactsViewModel()
        {

            CustomerTypes = new List<SelectListItem>();
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_KitchenTechnologist,
                Value = "Technolog kuchni",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_KitchentChef,
                Value = "Szef Kuchni",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_Architect,
                Value = "Architekt",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_ConsultingCompany,
                Value = "Firma consultingowa",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_GeneralContractor,
                Value = "Generalny wykonawca",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_Sanepid,
                Value = "Sanepid",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_SupervisionInspector,
                Value = "Inspektor nadzoru",
            });
            CustomerTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_VentilationDesigner,
                Value = "Projektant wentylacji",
            });

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
            }
        }
    }
}