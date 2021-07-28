using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class UsersViewModel
    {
        public List<SelectListItem> UserRoles { get; set; }
        //public List<SelectListItem> CustomerNames { get; set; }
        public List<SelectListItem> RegionCodeNames { get; set; }

        public int? Id { get; set; }

        [Required]
        [Display(Name = "Imię")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Nazwisko")]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Login")]
        public string Login { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Hasło jest nieprawidłowe")]
        [Display(Name = "Hasło")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [System.ComponentModel.DataAnnotations.Compare("Password")]
        [Display(Name = "Powtórz hasło")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "Uprawnienia")]
        public List<UserRoleType> Role { get; set; }

        [Display(Name = "Tekst powitalny")]
        public string WelcomeText { get; set; }

        [Display(Name = "Aktywny")]
        public bool IsActive { get; set; }

        [Display(Name = "Data urodzin")]
        public DateTime? BirthdayDate { get; set; }

        [Required]
        [Display(Name = "Klient")]
        public string CustomerName { get; set; }

        [Required]
        public int? CustomerId { get; set; }

        [Display(Name = "Bezpośredni przełożony")]
        public string Boss { get; set; }

        [Display(Name = "Stanowisko")]
        public string Position { get; set; }

        [Display(Name = "Numer telefonu")]
        public string Phone { get; set; }

        [Required]
        [Display(Name = "Region")]
        public int? RegionId { get; set; }

        public UsersViewModel()
        {
            UserRoles = new UserRoleDictRepository().GetAll()
                .Select(x => new SelectListItem()
                {
                    Text = x.Name,
                    Value = x.Id.ToString()
                }).ToList();

            List<Region> regions = new RegionRepository().GetAll()
                .OrderBy(r => r.Code)
                .ToList();
            RegionCodeNames = regions.Select(r => new SelectListItem()
            {
                Text = r.Code,
                Value = r.Id.ToString()
            }).ToList();
        }
    }
}