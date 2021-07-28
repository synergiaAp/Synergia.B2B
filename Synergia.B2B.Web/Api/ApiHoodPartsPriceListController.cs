//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using Synergia.B2B.Web.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

//namespace Synergia.B2B.Web.Api
//{
//    [Authorize(Roles = "Admin, HoodSelection")]
//    public class ApiHoodPartsPriceListController : ApiBaseController
//    {
//        [HttpGet]
//        public List<HoodPartsPriceList> GetAll()
//        {
//            try
//            {
//                HoodPartsPriceListRepository hoodPartsPriceListRepository = new HoodPartsPriceListRepository();
//                var result = hoodPartsPriceListRepository.GetAll();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
            
//        }

//        [HttpGet]
//        public GridResultDto GridGetHoodPartsPriceList([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                HoodPartsPriceListRepository hoodPartsPriceListRepository = new HoodPartsPriceListRepository();
//                GridResultDto result = hoodPartsPriceListRepository.GridGetHoodPartPriceList(model);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }
            
//        }

//        [HttpPost]
//        public int? SaveHoodPartsPriceList([FromBody]HoodSelectionHoodPartsPriceListViewModel model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                HoodPartsPriceListRepository hoodPartsPriceListRepository = new HoodPartsPriceListRepository();
//                HoodPartsPriceList hoodPartsPriceList = model.Id.HasValue ? hoodPartsPriceListRepository.GetById(model.Id.Value) : new HoodPartsPriceList();

//                hoodPartsPriceList.PriceNet = model.PriceNet;
//                hoodPartsPriceList.IsDeleted = false;
//                hoodPartsPriceList.ModifiedOn = DateTime.Now;
//                hoodPartsPriceList.ModifiedByUserId = loggedUser.Id;
//                if (hoodPartsPriceList.CreatedByUserId == 0)
//                {
//                    hoodPartsPriceList.CreatedByUserId = loggedUser.Id;
//                    hoodPartsPriceList.OwnerUserId = loggedUser.Id;
//                    hoodPartsPriceList.CreatedOn = DateTime.Now;
//                }
//                if (hoodPartsPriceList.Id == 0)
//                {
//                    hoodPartsPriceListRepository.Add(hoodPartsPriceList);
//                }
//                else
//                {
//                    hoodPartsPriceListRepository.Update(hoodPartsPriceList);
//                }

//                return hoodPartsPriceList.Id;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public HoodPartsPriceList GetHoodPartsPriceListData([FromUri]int id)
//        {
//            HoodPartsPriceListRepository hoodPartsPriceListRepository = new HoodPartsPriceListRepository();
//            HoodPartsPriceList hoodPartsPriceList = hoodPartsPriceListRepository.GetById(id);
//            return hoodPartsPriceList;
//        }
//    }
//}
