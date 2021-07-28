//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Repository.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace Synergia.B2B.Web.Models
//{
//    public class HoodSelectionOfferDetailsAirCalculationViewModel
//    {
//        public List<HoodOfferAirCalculationDevice> DeviceList { get; set; } 

//        public List<SelectListItem> DeviceListSelectListItem
//        {
//            get
//            {
//                return DeviceList.Select(x => new SelectListItem()
//                {
//                    Text = x.Name,
//                    Value = x.Id.ToString()
//                }).ToList();
//            }
//        }

//        public string DeviceListJson
//        {
//            get
//            {
//                return JsonConvert.SerializeObject(DeviceList);
//            }
//        }

//        public HoodSelectionOfferDetailsAirCalculationViewModel()
//        {
//            if(HttpContext.Current.Session != null)
//            {
//                DeviceList = new HoodOfferAirCalculationDeviceRepository().GetAll().OrderBy(x => x.Id).ToList();
//            }
//        }
//    }
//}
