using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class ProductsViewModel
    {
        public int? GroupId { get; set; }

        [Display(Name = "Nazwa")]
        public string Name { get; set; }

        [Display(Name = "Kod")]
        public string Code { get; set; }

        [Display(Name = "Grupa")]
        public string Group { get; set; }

        [Display(Name = "Linia")]
        public string Line { get; set; }

        [Display(Name = "Model")]
        public string Model { get; set; }

        [Display(Name = "Oznaczenie")]
        public string Mark { get; set; }

        [Display(Name = "Jednostka miary")]
        public string Um { get; set; }

        [Display(Name = "Waga")]
        public string Weight { get; set; }

        [Display(Name = "Wymiary")]
        public string Dimensions { get; set; }

        [Display(Name = "Opakowanie")]
        public string ProdPack { get; set; }

        [Display(Name = "Waluta")]
        public string Currency { get; set; }

        //[Display(Name = "Podaj ilość ")]
        [Display(Name = "")]
        public string ProdQuantityDesc { get; set; }

        [Display(Name = "Przyłącze")]
        public string Terminal { get; set; }

        [Display(Name = "Moc gaz")]
        public string PowerGas { get; set; }

        [Display(Name = "Moc prąd")]
        public string PowerElectricity { get; set; }

        [Display(Name = "Cena netto")]
        public decimal PriceNet { get; set; }




    }
}