//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
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
//    public class ApiHoodOfferAccessoriesController : ApiBaseController
//    {
//        [HttpDelete]
//        public IHttpActionResult Delete([FromUri]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                HoodOfferAccessoryRepository hoodOfferAccessoriesRepository = new HoodOfferAccessoryRepository();
//                var hoodOfferAccessory = hoodOfferAccessoriesRepository.GetById(id);
//                hoodOfferAccessory.ModifiedOn = DateTime.Now;
//                hoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                hoodOfferAccessory.IsDeleted = true;
//                hoodOfferAccessoriesRepository.Update(hoodOfferAccessory);

//                new HoodOfferRepository().CalculateHoodOfferPrice(hoodOfferAccessory.HoodOfferId);
//                return Ok(true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult Add([FromBody]AddHoodOfferAccessoryModel model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                if (model.Name.ContainsCaseInsensitive("JRS"))
//                {
//                    model.Name = $"Nawiewnik {model.Name}";
//                }

//                HoodOfferAccessoryRepository hoodOfferAccessoriesRepository = new HoodOfferAccessoryRepository();
//                var existingHoodOfferAccessory = hoodOfferAccessoriesRepository.GetByTypeAndName(model.Type.ToByte(), model.Name, model.HoodOfferId);
//                if(existingHoodOfferAccessory != null)
//                {
//                    existingHoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                    existingHoodOfferAccessory.ModifiedOn = DateTime.Now;
//                    existingHoodOfferAccessory.Quantity += 1;
//                    existingHoodOfferAccessory.FinalPrice = existingHoodOfferAccessory.Price * existingHoodOfferAccessory.Quantity;
//                    hoodOfferAccessoriesRepository.Update(existingHoodOfferAccessory);
//                }
//                else
//                {
//                    var priceList = new HoodPartsPriceListRepository().GetAll();
//                    decimal price = priceList.Where(x => x.Name.Replace("JRS ", "JRS-").ContainsCaseInsensitive(model.Name)).Single().PriceNet; ;

//                    var hoodOfferAccessory = new HoodOfferAccessory()
//                    {
//                        CreatedByUserId = loggedUser.Id,
//                        CreatedOn = DateTime.Now,
//                        HoodOfferId = model.HoodOfferId,
//                        ModifiedByUserId = loggedUser.Id,
//                        ModifiedOn = DateTime.Now,
//                        Name = model.Name,
//                        OwnerUserId = loggedUser.Id,
//                        Quantity = 1,
//                        Type = model.Type.ToByte(),
//                        FinalPrice = price,
//                        Price = price
//                    };
//                    hoodOfferAccessoriesRepository.Add(hoodOfferAccessory);
//                }

//                new HoodOfferRepository().CalculateHoodOfferPrice(model.HoodOfferId);
//                return Ok(true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage SaveQuantity([FromBody] SaveHoodOfferAccessoryQuantityModelDto model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                var hoodOfferAccessoryRepository = new HoodOfferAccessoryRepository();
//                var hoodOfferAccessory = hoodOfferAccessoryRepository.GetById(model.Id);
//                hoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                hoodOfferAccessory.ModifiedOn = DateTime.Now;
//                hoodOfferAccessory.Quantity = model.Quantity;
//                hoodOfferAccessory.FinalPrice = hoodOfferAccessory.Price * hoodOfferAccessory.Quantity;
//                hoodOfferAccessoryRepository.Update(hoodOfferAccessory);
//                new HoodOfferRepository().CalculateHoodOfferPrice(hoodOfferAccessory.HoodOfferId);

//                return Request.CreateResponse(HttpStatusCode.OK, true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }
//    }
//}
