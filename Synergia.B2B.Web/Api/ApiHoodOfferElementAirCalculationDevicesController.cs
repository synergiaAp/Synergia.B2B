//using Synergia.B2B.Common.Dto.Api.HoodOffer;
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
//    [Authorize(Roles = "Admin, HoodSelection, HoodOffersAndOrders")]
//    public class ApiHoodOfferElementAirCalculationDevicesController : ApiBaseController
//    {
//        [HttpGet]
//        public HttpResponseMessage GetHoodOfferElementAirCalculationDevices([FromUri]int hoodOfferElementId)
//        {
//            try
//            {
//                HoodOfferElementAirCalculationDeviceRepository repository = new HoodOfferElementAirCalculationDeviceRepository();
//                List<HoodOfferElementAirCalculationDevice> items = repository.GetByHoodOfferElementId(hoodOfferElementId);
//                if (items == null)
//                {
//                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
//                }

//                GetHoodOfferElementAirCalculationDevicesResultDto result = new GetHoodOfferElementAirCalculationDevicesResultDto()
//                {
//                    HoodOfferElementId = hoodOfferElementId,
//                    Elements = MappingHelper.Mapper.Map<List<HoodOfferElementAirCalculationDeviceDto>>(items)
//                };

//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch(Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage SaveHoodOfferElementAirCalculationDevices([FromBody] GetHoodOfferElementAirCalculationDevicesResultDto model)
//        {
//            try
//            {
//                HoodOfferElementAirCalculationDeviceRepository repository = new HoodOfferElementAirCalculationDeviceRepository();
//                bool result = repository.Save(model, GetLoggedUser().Id);

//                if (result)
//                {
//                    return Request.CreateResponse(HttpStatusCode.OK, result);
//                }
//                else
//                {
//                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
//                }
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }
//    }
//}
