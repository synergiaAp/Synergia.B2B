using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class HoodSelectionHoodPartsPriceListViewModel
    {
        public int? Id { get; set; }
        [Display(Name = "Nazwa elementu")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Cena netto (zł)")]
        public decimal PriceNet { get; set; }
    }
}