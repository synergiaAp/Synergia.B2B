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
    public class MonthlyReportsViewModel
    {
        public int? Id { get; set; }

        [Required]
        [Display(Name = "Rok/Miesiąc")]
        public string Date { get; set; }

        [Display(Name = "Wartość zamówień (zł)")]
        public decimal? OrdersValueSum { get; set; }

        [Display(Name = "Wartość plan. zamów. na kolejny mc (zł)")]
        public decimal? PlannedOrdersValueSum { get; set; }

        [Display(Name = "Wartość plan. zamów. na 3 miesiące (zł)")]
        public decimal? PlannedOrdersThreeMonthsValueSum { get; set; }

        [Display(Name = "Urlopy")]
        public string Holidays { get; set; }

        [Display(Name = "Podsumowanie miesiąca")]
        public string Summary { get; set; }

        [Display(Name = "Ważne nowe kontakty personalne")]
        public string NewContacts { get; set; }

        [Display(Name = "Działalność marketingowa")]
        public string MarketingActivities { get; set; }

        [Display(Name = "Plany marketingowe")]
        public string MarketingPlans { get; set; }

        [Display(Name = "Serwis, pomiary, regulacje okapów, reklamacje, inne")]
        public string Troubles { get; set; }

        [Display(Name = "Pracownik")]
        public string WorkerName { get; set; }

        public int WorkerId{ get; set; }

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

        [Display(Name = "Suma spotkań")]
        public short? MeetingsQuantity { get; set; }

        [Display(Name = "Oferty okapy")]
        public short? HoodOffers { get; set; }

        [Display(Name = "Oferty centrale")]
        public short? CentralOffers { get; set; }

        [Display(Name = "Oferty Smoki")]
        public short? SmokiOffers { get; set; }

        [Display(Name = "Oferty Ansul")]
        public short? AnsulOffers { get; set; }

        [Display(Name = "Oferty Mareno")]
        public short? MarenoOffers { get; set; }

        [Display(Name = "Oferty nawiewniki")]
        public short? VentilatorOffers { get; set; }

        [Display(Name = "Oferty KES")]
        public short? KesOffers { get; set; }

        [Display(Name = "Dobory tech. centrale")]
        public short? CentralTechnicalSelections { get; set; }

        [Display(Name = "Dobory tech. Smoki")]
        public short? SmokiTechnicalSelections { get; set; }

        [Display(Name = "Dobory tech. okapy")]
        public short? HoodTechnicalSelections { get; set; }

        [Display(Name = "Umowy handlowe")]
        public short? Agreements { get; set; }

        [Display(Name = "Technolog kuchni")]
        public short? MeetingsKitchenTechnologist { get; set; }

        [Display(Name = "Architekt")]
        public short? MeetingsArchitect { get; set; }

        [Display(Name = "Firma consultingowa")]
        public short? MeetingsConsultingCompany { get; set; }

        [Display(Name = "Firma gastronomiczna")]
        public short? MeetingsGastronomyCompany { get; set; }

        [Display(Name = "Generalny wykonawca")]
        public short? MeetingsGeneralContractor { get; set; }

        [Display(Name = "Wykonawca instalacji")]
        public short? MeetingsInstallationContractor { get; set; }

        [Display(Name = "Diler Synergia")]
        public short? MeetingsSynergiaDealer { get; set; }

        [Display(Name = "Diler Mareno")]
        public short? MeetingsMarenoDealer { get; set; }

        [Display(Name = "Inwestor sieciowy")]
        public short? MeetingsNetworkInvestor { get; set; }

        [Display(Name = "Inwestor pojedynczy")]
        public short? MeetingsSingleInvestor { get; set; }

        [Display(Name = "Sanepid")]
        public short? MeetingsSanepid { get; set; }

        [Display(Name = "Projektant wentylacji")]
        public short? MeetingsVentilationDesigner { get; set; }

        [Display(Name = "Hurtownia wentylacyjna")]
        public short? MeetingsVentilationWholesaler { get; set; }

        [Display(Name = "Szef kuchni")]
        public short? MeetingsKitchentChef { get; set; }

        [Display(Name = "Inspektor nadzoru")]
        public short? MeetingsSupervisionInspector { get; set; }

        [Display(Name = "Suma ofert")]
        public short? OffersSum { get; set; }

        [Display(Name = "Suma doborów tech.")]
        public short? TechnicalSelectionsSum { get; set; }

        [Display(Name = "Prezes")]
        public string President { get; set; } = "Witold Levén";
    }
    
}