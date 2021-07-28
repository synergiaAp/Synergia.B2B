using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class HoodSelectionOfferHoodDetailsModalViewModel
    {
        [Display(Name = "Numer oferty")]
        public string HoodOfferNumberModal { get; set; }

        [Display(Name = "Status")]
        public string HoodStatusTextModal { get; set; }


        public int? HoodOfferElementId { get; set; }

        public int HoodOfferId { get; set; }

        [Display(Name = "Dobrany okap")]
        public string HoodNr { get; set; }

        [Display(Name = "Typ")]
        public string Type { get; set; }

        [Display(Name = "Filtry")]
        public string FilterType { get; set; }

        [Display(Name = "Długość")]
        [Required]
        public int? Length { get; set; }

        [Display(Name = "Inna długość")]
        public string LengthAdditionalValue { get; set; }

        [Display(Name = "Szerokość")]
        [Required]
        public int? Width { get; set; }

        [Display(Name = "Inna szerokość")]
        public string WidthAdditionalValue { get; set; }

        [Display(Name = "Wysokość")]
        [Required]
        public int? Height { get; set; }

        [Display(Name = "Inna wysokość")]
        public string HeightAdditionalValue { get; set; }

        [Display(Name = "Liczba nawiewników")]
        public int? VentilatorCount { get; set; }

        [Display(Name = "Ilość wiązek")]
        public int? WiresCount { get; set; }

        [Display(Name = "Średnica nawiewu")]
        public int? VentilatorDiameter { get; set; }

        [Display(Name = "Inna średnica nawiewu")]
        public string VentilatorDiameterAdditionalValue { get; set; }

        [Display(Name = "Króćce wywiewne")]
        public int? ExhaustCount { get; set; }

        [Display(Name = "Dobrany filtr")]
        public string FilterAccepted { get; set; }

        [Display(Name = "Średnica wywiewu")]
        public int? ExhaustDiameter { get; set; }

        [Display(Name = "Inna średnica wywiewu")]
        public string ExhaustDiameterAdditionalValue { get; set; }

        [Display(Name = "Strumień nawiewu")]
        [Required]
        public int? VentilatorStream { get; set; }

        [Display(Name = "Maksymalny strumień nawiewu")]
        public int? MaxVentilatorStream { get; set; }

        [Display(Name = "Wyliczony strumień wywiewu")]
        [Required]
        public int? ExhaustStreamCalculated { get; set; }

        [Display(Name = "Przyjęty strumień wywiewu")]
        [Required]
        public int? ExhaustStreamAccepted { get; set; }

        [Display(Name = "Alternatywny strumień wywiewu")]
        public string ExhaustStreamAdditionalValue { get; set; }

        [Display(Name = "Króćce wywiewne")]
        public int? AdditionalFilterExhaustCount { get; set; }

        [Display(Name = "Dobrany filtr")]
        public string AdditionalFilterFilterAccepted { get; set; }

        [Display(Name = "Wartość")]
        [Required]
        public int? AdditionalFilterExhaustStreamAccepted { get; set; }

        [Display(Name = "Uwagi")]
        public string Comments { get; set; }

        [Display(Name = "Inna liczba nawiewników")]
        public string VentilatorCountAdditionalValue { get; set; }

        [Display(Name = "Inna liczba króćców wywiewnych")]
        public string ExhaustCountAdditionalValue { get; set; }

        [Display(Name = "Jednostki sterujące")]
        public bool ControlPanelUnitEnabled { get; set; }
        [Display(Name = "Panel sterujący")]
        public int? ControlPanelCount { get; set; }
        [Display(Name = "Jednostka sterująca")]
        public int? ControlUnitCount { get; set; }

        [Display(Name = "Cena (zł)")]
        public decimal? Price { get; set; }

        [Display(Name = "Lokalizacja")]
        public string LocationType { get; set; }

        public bool SAllDevicesEnabled { get; set; }
        public decimal SAllDevicesValue { get; set; }
        public bool Factor063Enabled { get; set; }

        [Display(Name = "Ilość modułów")]
        public int ModuleCount { get; set; }

        //[Display(Name = "Codar RS T5 IP66 2x14W")]
        //public int LightingCodar14Count { get; set; }
        //[Display(Name = "Codar RS T5 IP66 2x28W")]
        //public int LightingCodar28Count { get; set; }
        //[Display(Name = "Codar RS T5 IP66 2x49W")]
        //public int LightingCodar49Count { get; set; }
        [Display(Name = "Oświetlenie ledowe puntkowe IP65 9W")]
        public int LightingLED9Count { get; set; }

        [Display(Name = "Dodatkowa cena (zł)")]
        public decimal? PriceAdditionalValue { get; set; }

        [Display(Name = "LED60 30W IP65 4000K")]
        public int LightingLED6030WCount { get; set; }

        [Display(Name = "LED90 45W IP65 4000K")]
        public int LightingLED9045WCount { get; set; }

        [Display(Name = "LED120 60W IP65 4000K")]
        public int LightingLED12060WCount { get; set; }

        [Display(Name = "LED150 75W IP65 4000K")]
        public int LightingLED15075WCount { get; set; }

        [Display(Name = "LED60 18W IP65 4000K")]
        public int LightingLED6018WCount { get; set; }

        [Display(Name = "LED120 36W IP65 4000K")]
        public int LightingLED12036WCount { get; set; }

        [Display(Name = "LED150 50W IP65 4000K")]
        public int LightingLED15050WCount { get; set; }

        [Display(Name = "Numer")]
        public string OrderNoText { get; set; }

        [Display(Name = "Ciężar (kg)")]
        public int? Weight { get; set; }

        [Display(Name = "Dodatkowy ciężar (kg)")]
        public int? WeightAdditionalValue { get; set; }

        [Display(Name = "Układ")]
        public HoodOfferElementLayoutType? LayoutType { get; set; }

        [Display(Name = "Ansul")]
        public bool AdditionalAccessoryAnsulEnabled { get; set; }

        [Display(Name = "")]
        public string AdditionalAccessoryAnsulType { get; set; }

        [Display(Name = "Finalna cena (zł)")]
        public decimal? FinalPriceSingleElement { get; set; }

        [Display(Name = "Finalny ciężar (kg)")]
        public int? FinalWeightSingleElement { get; set; }


        public List<SelectListItem> TypeList { get; set; }
        public List<SelectListItem> HeightList { get; set; }
        public List<SelectListItem> LocationTypeList { get; set; }
        public List<SelectListItem> AdditionalAccessoryAnsulTypeList { get; set; }

        public HoodSelectionOfferHoodDetailsModalViewModel()
        {
            if (HttpContext.Current.Session != null)
            {
                TypeList = new List<SelectListItem>()
                {
                    new SelectListItem(){ Text = "JSI-R"},
                    new SelectListItem(){ Text = "JSVI-R"},
                    new SelectListItem(){ Text = "JSVI-R-W"},
                    new SelectListItem(){ Text = "JVI-R"},
                    new SelectListItem(){ Text = "JVI-R-W"},
                    new SelectListItem(){ Text = "JLI-R"},
                    new SelectListItem(){ Text = "JSI-S"},
                    new SelectListItem(){ Text = "JSVI-S"},
                    new SelectListItem(){ Text = "JSVI-S-W"},
                    new SelectListItem(){ Text = "JLI-S"},
                    new SelectListItem(){ Text = "JSKI"},
                    new SelectListItem(){ Text = "JKI"}
                };

                HeightList = new List<SelectListItem>()
                {
                    new SelectListItem(){ Text = "330", Value = "330"},
                    new SelectListItem(){ Text = "540", Value= "540", Selected = true}
                };

                LocationTypeList = new List<SelectListItem>()
                {
                    new SelectListItem(){ Text = "Wyspowy", Value="Wyspowy", Selected = true},
                    new SelectListItem(){ Text = "Przyścienny", Value="Przyścienny"}
                };

                AdditionalAccessoryAnsulTypeList = new List<SelectListItem>()
                {
                    new SelectListItem(){ Text="Brak wyboru"},
                    new SelectListItem(){ Text="Układ dedykowany 1-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 2-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 3-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 4-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 5-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 6-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 7-zbiornikowy"},
                    new SelectListItem(){ Text="Układ dedykowany 8-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 1-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 2-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 3-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 4-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 5-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 6-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 7-zbiornikowy"},
                    new SelectListItem(){ Text="Układ nakładający się 8-zbiornikowy"}
                };
            }
        }
    }
}