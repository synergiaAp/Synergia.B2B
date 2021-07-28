//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Dto.Api.HoodOffer;
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
//    [Authorize(Roles = "Admin, HoodSelection, HoodOffersAndOrders")]
//    public class ApiHoodOfferElementsController : ApiBaseController
//    {
//        [HttpGet]
//        public HttpResponseMessage GridGetAllHoodOfferElements([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                HoodOfferElementRepository offerElementRepository = new HoodOfferElementRepository();
//                GridResultDto result = offerElementRepository.GridGetAllHoodOfferElements(model, user.Id);
//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpGet]
//        public HttpResponseMessage GridGetHoodOfferElements([FromUri]HoodOfferElementsListGridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                HoodOfferElementRepository offerElementRepository = new HoodOfferElementRepository();
//                GridResultDto result = offerElementRepository.GridGetHoodOfferElements(model, user.Id);
//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage DeleteHoodOfferElement([FromBody]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                using (var tran = hoodOfferElementRepository.CreateTransaction())
//                {
//                    HoodOfferElement hoodOfferElement = hoodOfferElementRepository.GetById(id);
//                    hoodOfferElement.ModifiedOn = DateTime.Now;
//                    hoodOfferElement.ModifiedByUserId = loggedUser.Id;
//                    hoodOfferElement.IsDeleted = true;
//                    hoodOfferElementRepository.Update(hoodOfferElement);

//                    var hoodOfferAccessoryRepository = new HoodOfferAccessoryRepository();
//                    var hoodOfferAccessories = hoodOfferAccessoryRepository.GetByHoodOfferElementId(hoodOfferElement.Id);
//                    foreach (var hoodOfferAccessory in hoodOfferAccessories)
//                    {
//                        hoodOfferAccessory.IsDeleted = true;
//                        hoodOfferAccessoryRepository.Update(hoodOfferAccessory);
//                    }

//                    #region RecalculateOrderNo
//                    var allHoodOfferElements = hoodOfferElementRepository.GetByHoodOfferId(hoodOfferElement.HoodOfferId)
//                        .OrderBy(x => x.OrderNo)
//                        .ToList(); ;
//                    byte index = 1;
//                    foreach (var item in allHoodOfferElements)
//                    {
//                        if (item.OrderNoText == item.OrderNo.ToString())
//                        {
//                            item.OrderNoText = index.ToString();
//                        }
//                        item.OrderNo = index++;
//                        hoodOfferElementRepository.Update(item);
//                    }
//                    #endregion

//                    new HoodOfferRepository().CalculateHoodOfferPrice(hoodOfferElement.HoodOfferId);
//                    tran.Complete();
//                }

//                return Request.CreateResponse(HttpStatusCode.OK, true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpGet]
//        public HttpResponseMessage GetHoodOfferElementData([FromUri]int id)
//        {
//            try
//            {
//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                HoodOfferElement hoodOfferElement = hoodOfferElementRepository.GetById(id);
//                HoodSelectionOfferHoodDetailsModalViewModel result = MappingHelper.Mapper.Map<HoodSelectionOfferHoodDetailsModalViewModel>(hoodOfferElement);
//                result.HoodOfferElementId = id;
//                HoodOffer hoodOffer = new HoodOfferRepository().GetById(hoodOfferElement.HoodOfferId);
//                result.HoodOfferNumberModal = hoodOffer.OfferNumber;
//                result.HoodStatusTextModal = ((HoodOfferStatus)hoodOffer.Status).GetDescription();
//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage SaveHoodOfferElementData([FromBody]HoodSelectionOfferHoodDetailsModalViewModel model)
//        {
//            try
//            {
//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                var loggedUser = GetLoggedUser();
//                DateTime now = DateTime.Now;
//                HoodOfferElement hoodOfferElement = null;
//                using (var tran = hoodOfferElementRepository.CreateTransaction())
//                {
//                    hoodOfferElement = model.HoodOfferElementId.HasValue
//                        ? hoodOfferElementRepository.GetById(model.HoodOfferElementId.Value)
//                        : new HoodOfferElement()
//                        {
//                            CreatedByUserId = loggedUser.Id,
//                            OwnerUserId = loggedUser.Id,
//                            CreatedOn = now,
//                            Quantity = 1
//                        };
//                    hoodOfferElement.ModifiedByUserId = loggedUser.Id;
//                    hoodOfferElement.ModifiedOn = now;
//                    MappingHelper.Mapper.Map(model, hoodOfferElement);
//                    hoodOfferElement.FinalPrice = hoodOfferElement.FinalPriceSingleElement * hoodOfferElement.Quantity;

//                    if (!hoodOfferElement.OrderNo.HasValue)
//                    {
//                        byte nextOrderNo = hoodOfferElementRepository.GetNextOrderNo(hoodOfferElement.HoodOfferId);
//                        hoodOfferElement.OrderNo = nextOrderNo;
//                    }

//                    if (string.IsNullOrEmpty(hoodOfferElement.OrderNoText))
//                    {
//                        hoodOfferElement.OrderNoText = hoodOfferElement.OrderNo.ToString();
//                    }

//                    hoodOfferElementRepository.Save(hoodOfferElement);


//                    var hoodOfferAccessoryRepository = new HoodOfferAccessoryRepository();
//                    var ansulHoodOfferAccessory = hoodOfferAccessoryRepository.GetByHoodOfferElementId(hoodOfferElement.Id, HoodOfferAccessoryType.Ansul)
//                        .SingleOrDefault();
//                    if ((!hoodOfferElement.AdditionalAccessoryAnsulEnabled || hoodOfferElement.AdditionalAccessoryAnsulType == "Brak wyboru"))
//                    {
//                        if (ansulHoodOfferAccessory != null)
//                        {
//                            ansulHoodOfferAccessory.IsDeleted = true;
//                            hoodOfferAccessoryRepository.Update(ansulHoodOfferAccessory);
//                        }
//                    }
//                    else
//                    {
//                        if (ansulHoodOfferAccessory == null)
//                        {
//                            ansulHoodOfferAccessory = new HoodOfferAccessory()
//                            {
//                                CreatedByUserId = loggedUser.Id,
//                                CreatedOn = DateTime.Now,
//                                HoodOfferId = model.HoodOfferId,
//                                OwnerUserId = loggedUser.Id,
//                                Quantity = 1,
//                                Type = HoodOfferAccessoryType.Ansul.ToByte(),
//                                HoodOfferElementId = hoodOfferElement.Id
//                            };
//                        }

//                        ansulHoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                        ansulHoodOfferAccessory.ModifiedOn = DateTime.Now;

//                        string ansulZbiornikCount = hoodOfferElement.AdditionalAccessoryAnsulType
//                            .Substring(hoodOfferElement.AdditionalAccessoryAnsulType.IndexOf("-") - 1, 1);
//                        ansulHoodOfferAccessory.Name = $"System {ansulZbiornikCount}-zbiornikowy Ansul R-102";

//                        var priceList = new HoodPartsPriceListRepository().GetAll();
//                        decimal price = priceList.Where(x => x.Name == $"ANSUL układ {ansulZbiornikCount}-zbiornikowy").Single().PriceNet;

//                        ansulHoodOfferAccessory.FinalPrice = price;
//                        ansulHoodOfferAccessory.Price = price;
//                        hoodOfferAccessoryRepository.Save(ansulHoodOfferAccessory);
//                    }

//                    new HoodOfferRepository().CalculateHoodOfferPrice(model.HoodOfferId);
//                    tran.Complete();
//                }
//                return Request.CreateResponse(HttpStatusCode.OK, hoodOfferElement.Id);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage SaveHoodOfferElementQuantity([FromBody] SaveHoodOfferElementQuantityModelDto model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                HoodOfferElement hoodOfferElement = hoodOfferElementRepository.GetById(model.HoodOfferElementId);
//                hoodOfferElement.ModifiedByUserId = loggedUser.Id;
//                hoodOfferElement.ModifiedOn = DateTime.Now;
//                hoodOfferElement.Quantity = model.Quantity;
//                hoodOfferElement.FinalPrice = hoodOfferElement.FinalPriceSingleElement * hoodOfferElement.Quantity;
//                hoodOfferElementRepository.Update(hoodOfferElement);
//                new HoodOfferRepository().CalculateHoodOfferPrice(hoodOfferElement.HoodOfferId);

//                return Request.CreateResponse(HttpStatusCode.OK, true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage SetHoodOfferElementOrderNo([FromBody] SetHoodOfferElementOrderNoModelDto model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                HoodOfferElement hoodOfferElement = hoodOfferElementRepository.GetById(model.HoodOfferElementId);

//                #region RecalculateOrderNo
//                var allHoodOfferElements = hoodOfferElementRepository.GetByHoodOfferId(hoodOfferElement.HoodOfferId)
//                    .OrderBy(x => x.OrderNo)
//                    .ToList();
//                var modifiedHoodOfferElement = allHoodOfferElements.Where(x => x.Id == model.HoodOfferElementId).Single();
//                allHoodOfferElements.RemoveAll(x => x.Id == model.HoodOfferElementId);
//                allHoodOfferElements.Insert(model.OrderNo - 1, modifiedHoodOfferElement);

//                byte index = 1;
//                foreach (var item in allHoodOfferElements)
//                {
//                    if (item.OrderNo != index)
//                    {
//                        item.ModifiedByUserId = loggedUser.Id;
//                        item.ModifiedOn = DateTime.Now;
//                        if (item.OrderNoText == item.OrderNo.ToString())
//                        {
//                            item.OrderNoText = index.ToString();
//                        }
//                        item.OrderNo = index;

//                        hoodOfferElementRepository.Update(item);
//                    }
//                    index++;
//                }
//                #endregion

//                return Request.CreateResponse(HttpStatusCode.OK, true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpGet]
//        public IHttpActionResult GetNextHoodOfferElementOrderNo([FromUri] int hoodOfferId)
//        {
//            try
//            {
//                var nextOrderNo = new HoodOfferElementRepository().GetNextOrderNo(hoodOfferId);
//                return Ok(nextOrderNo);
//            }
//            catch(Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }
//    }
//}
