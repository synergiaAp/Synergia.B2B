using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
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
    public class WeeklyPlansViewModel
    {
        public int? Id { get; set; }

        [Required]
        [Display(Name = "Data utworzenia")]
        public DateTime CreatedOn { get; set; }

        [Display(Name = "Poniedziałek")]
        public string Monday { get; set; }

        [Display(Name = "Wtorek")]
        public string Tuesday { get; set; }

        [Display(Name = "Środa")]
        public string Wednesday { get; set; }

        [Display(Name = "Czwartek")]
        public string Thursday { get; set; }

        [Display(Name = "Piątek")]
        public string Friday { get; set; }

        [Display(Name = "Sobota")]
        public string Saturday { get; set; }
        
        [Display(Name = "Niedziela")]
        public string Sunday { get; set; }

        [Display(Name = "Pracownik")]
        public string WorkerName { get; set; }

        public int WorkerId { get; set; }

        [Display(Name = "Bezpośredni przełożony")]
        public string Boss { get; set; }

        [Display(Name = "Nazwa regionu")]
        public string RegionName { get; set; }

        public int? RegionId { get; set; }

        [Display(Name = "Region")]
        public string RegionCode { get; set; }

        public IEnumerable<Province> ProvincesList { get; set; }

        [Display(Name = "Województwa")]
        public string Provinces { get; set; }

        public byte Status { get; set; }

        [Display(Name = "Tydzień")]
        [Required]
        public string WeekValue { get; set; } = DateTime.Today.StartOfWeek().ToWeekString();
        public DateTime? WeekValueDate { get; set; } = DateTime.Today.StartOfWeek();
    }
}
