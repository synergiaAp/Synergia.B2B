using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class ConfigurationViewModel
    {
        public int? Id { get; set; }

        [Display(Name = "Tekst powitalny")]
        public string WelcomeText { get; set; }

        [Display(Name = "Nadpisz tekst powitalny użytkowników")]
        public bool OverrideUserWelcomeText { get; set; }

        [Display(Name = "Duży tekst urodzinowy")]
        public string BigBirthdayText { get; set; }

        [Display(Name = "Mały tekst urodzinowy")]
        public string SmallBirthdayText { get; set; }
        [Display(Name = "Odbiorcy wiadomości email, dotyczących zamówień (oddzieleni średnikiem)")]
        public string OrderEmailRecipients { get; set; }
        //[Display(Name = "Odbiorcy wiadomości email, dotyczących zamówień okapów (oddzieleni średnikiem)")]
        //public string HoodOrderEmailRecipients { get; set; }        
        //[Display(Name = "Odbiorcy wiadomości email, dotyczących złożonych raportów miesięcznych (oddzieleni średnikiem)")]
        //public string SubmittedMonthlyReportEmailRecipients { get; set; }
    }
}