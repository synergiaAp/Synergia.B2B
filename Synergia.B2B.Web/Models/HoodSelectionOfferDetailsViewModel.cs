using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class HoodSelectionOfferDetailsViewModel
    {
        public int? HoodOfferId { get; set; }

        [Required]
        [RegularExpression("(JE\\d\\d-\\d{1,}_\\d{1,})|(-)")]
        [Display(Name = "Numer oferty")]
        public string HoodOfferNumber { get; set; }

        [Display(Name = "Status")]
        public string HoodStatusText { get; set; }
    }
}