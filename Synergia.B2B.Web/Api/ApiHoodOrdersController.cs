//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

//namespace Synergia.B2B.Web.Api
//{
//    [Authorize(Roles = "Admin, HoodOffersAndOrders")]
//    public class ApiHoodOrdersController : ApiBaseController
//    {
//        [HttpGet]
//        public GridResultDto GridGetHoodOrders([FromUri]HoodOrderListGridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                GridResultDto result = new HoodOrderRepository().GridGetHoodOrders(model, user.Id);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }
//    }
//}
