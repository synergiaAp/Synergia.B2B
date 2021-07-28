using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class CampaignsViewModel
    {
        public int? Id { get; set; }

        [Display(Name = "Nazwa")]
        [StringLength(500)]
        [Required]
        public string Name { get; set; }

        [Display(Name = "Tytuł")]
        [StringLength(500)]
        [Required]
        public string MessageSubject { get; set; }

        [Display(Name = "Treść")]
        [Required]
        public string MessageContent { get; set; }

        public List<SelectListItem> ContactTypes { get; set; }

        public CampaignsViewModel()
        {
            ContactTypes = new List<SelectListItem>();
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_KitchenTechnologist,
                Value = "Technolog kuchni",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_KitchentChef,
                Value = "Szef Kuchni",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_Architect,
                Value = "Architekt",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_ConsultingCompany,
                Value = "Firma consultingowa",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_GeneralContractor,
                Value = "Generalny wykonawca",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_Sanepid,
                Value = "Sanepid",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_SupervisionInspector,
                Value = "Inspektor nadzoru",
            });
            ContactTypes.Add(new SelectListItem
            {
                Text = Resources.Common.CustomerType_VentilationDesigner,
                Value = "Projektant wentylacji",
            });
        }

    }
}