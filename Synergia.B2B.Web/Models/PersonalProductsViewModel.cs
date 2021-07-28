using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class PersonalProductsViewModel
    {
        public int? Id { get; set; }

        [Required]
        [Display(Name = "Kod/Model")]
        public string Code { get; set; }

        [Required]
        [Display(Name = "Nazwa")]
        public string Name { get; set; }

        [Display(Name = "Wymiary")]
        public string Dimensions { get; set; }

        [Display(Name = "Waluta")]
        public string Currency { get; set; }


        [Display(Name = "Przyłącze")]
        public string Terminal { get; set; }

        [Display(Name = "Moc gaz")]
        public decimal? PowerGas { get; set; }

        [Display(Name = "Moc prąd")]
        public decimal? PowerElectricity { get; set; }

        [Required]
        [Display(Name = "Cena netto (zł)")]
        public decimal? PriceNet { get; set; }

        [Display(Name = "Opis")]
        public string Description { get; set; }
    }
}