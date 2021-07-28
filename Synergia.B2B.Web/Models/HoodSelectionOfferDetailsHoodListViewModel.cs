using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class HoodSelectionOfferDetailsHoodListViewModel
    {
        [Display(Name = "")]
        public string AdditionalAccessorySmokiType { get; set; }

        [Display(Name = "")]
        public string AdditionalAccessoryNawiewnikiType { get; set; }

        public List<SelectListItem> AdditionalAccessorySmokiTypeList { get; set; }
        public List<SelectListItem> AdditionalAccessoryNawiewnikiTypeList { get; set; }

        public HoodSelectionOfferDetailsHoodListViewModel()
        {
            AdditionalAccessorySmokiTypeList = new List<SelectListItem>()
            {
                new SelectListItem(){ Text = "SMOKI MAXI GRILL 250"},
                new SelectListItem(){ Text = "SMOKI MAXI GRILL 350"},
                new SelectListItem(){ Text = "SMOKI MAXI GRILL 400"},
                new SelectListItem(){ Text = "SMOKI MAXI GRILL 500"},
                new SelectListItem(){ Text = "SMOKI JUNIOR 200"},
                new SelectListItem(){ Text = "SMOKI JUNIOR 250"},
                new SelectListItem(){ Text = "SMOKI JUNIOR 300"}
            };

            AdditionalAccessoryNawiewnikiTypeList = new List<SelectListItem>()
            {
                new SelectListItem(){ Text = "JRS-300x600"},
                new SelectListItem(){ Text = "JRS-300x1200"},
                new SelectListItem(){ Text = "JRS-600x600"},
                new SelectListItem(){ Text = "JRS-600x900"},
                new SelectListItem(){ Text = "JRS-600x1200"},
                new SelectListItem(){ Text = "JRS-600x1800"},
            };
        }
    }
}