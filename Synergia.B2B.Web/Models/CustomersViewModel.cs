using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class CustomersViewModel
    {
        public List<SelectListItem> CustomerTypes { get; set; }

        public int? Id { get; set; }

        [Display(Name = "Nazwa")]
        public string Name { get; set; }

        [Display(Name = "NIP")]
        public string NIP { get; set; }

        [Display(Name = "Adres")]
        public string Address { get; set; }

        [Display(Name = "Kod pocztowy")]
        public string PostalCode { get; set; }

        [Display(Name = "Miasto")]
        public string City { get; set; }

        [Display(Name = "E-mail (adres dla faktur elektronicznych)")]
        public string Email { get; set; }

        [Display(Name = "REGON")]
        public string Regon { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency1 { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency2 { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency3 { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency4 { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string Currency5 { get; set; }

        [Display(Name = "Stan należności PLN")]
        public string ReceivablesPLN { get; set; }

        [Display(Name = "Stan należności EUR")]
        public string ReceivablesEUR { get; set; }


        [Display(Name = "Forma płatności / termin")]
        public string PaymentFormName { get; set; }

        [Display(Name = "Waluta zamówień")]
        public string OrderCurrency { get; set; }

        [Display(Name = "Darmowy transport")]
        public string TransportFree { get; set; }

        [Display(Name = "Darmowy transport")]
        public string TransportFree2 { get; set; }

        [Display(Name = "Koszt transportu")]
        public string TransportCost { get; set; }

        [Display(Name = "Transport min")]
        public string TransportMin { get; set; }

        [Display(Name = "Transport min")]
        public string TransportMin2 { get; set; }

        [Display(Name = "Kredyt kupiecki")]
        public string LimitValue { get; set; }


        [Display(Name = "Typ klienta ")]
        public List<int> CustomerType { get; set; }

        [Display(Name = "Charakterystyka klienta")]
        public string Discription { get; set; }

        [Display(Name = "Rok rozpoczęcia współpracy")]
        public short? StartYear { get; set; }

        [Display(Name = "Ostatni kontakt")]
        public DateTime? LastContact { get; set; }

        [Display(Name = "Wyzwanie na najbliższy rok")]
        public string Challenge { get; set; }

        [Display(Name = "Dostarczone materiały")]
        public string DeliveredMaterials { get; set; }

        [Display(Name = "Status")]
        public byte? Status { get; set; }

        public CustomersViewModel()
        {
            CustomerTypes = new CustomerTypeRepository().GetAll()
                .Select(x => new SelectListItem()
                {
                    Text = x.Name,
                    Value = x.Id.ToString()
                }).ToList();

            //CustomerTypes = new List<SelectListItem>();
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_KitchenTechnologist,
            //    Value = "Technolog kuchni",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_Architect,
            //    Value = "Architekt",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_ConsultingCompany,
            //    Value = "Firma consultingowa",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_GastronomyCompany,
            //    Value = "Firma gastronomiczna",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_GeneralContractor,
            //    Value = "Generalny wykonawca",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_InstallationContractor,
            //    Value = "Wykonawca instalacji",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_SynergiaDealer,
            //    Value = "Diler Synergia",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_MarenoDealer,
            //    Value = "Diler Mareno",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_NetworkInvestor,
            //    Value = "Inwestor sieciowy",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_SingleInvestor,
            //    Value = "Inwestor pojedynczy",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_Sanepid,
            //    Value = "Sanepid",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_VentilationDesigner,
            //    Value = "Projektant wentylacji",
            //});
            //CustomerTypes.Add(new SelectListItem
            //{
            //    Text = Resources.Common.CustomerType_VentilationWholesaler,
            //    Value = "Hurtownia wentylacyjna",
            //});
        }
    }
}