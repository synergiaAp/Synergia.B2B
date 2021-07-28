//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Dto.Api.HoodFinalOffer;
//using Synergia.B2B.Common.Dto.Api.Offer;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using Synergia.B2B.Repository.Services.Mail;
//using Synergia.B2B.Repository.Services.Pdf;
//using Synergia.B2B.Web.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Transactions;
//using System.Web;
//using System.Web.Http;

//namespace Synergia.B2B.Web.Api
//{
//    //[Authorize(Roles = "Admin, HoodOffersAndOrders")]
//    //public class ApiHoodFinalOffersController : ApiBaseController
//    //{
//    //    [HttpGet]
//    //    public IHttpActionResult GridGetHoodFinalOffers([FromUri]HoodFinalOfferListGridParametersDto model)
//    //    {
//    //        try
//    //        {
//    //            User user = GetLoggedUser();
//    //            HoodFinalOfferRepository hoodFinalOfferRepository = new HoodFinalOfferRepository();
//    //            GridResultDto result = hoodFinalOfferRepository.GridGetHoodFinalOffers(model, user.Id);

//    //            return Ok(result);
//    //        }
//    //        catch (Exception ex)
//    //        {

//    //            LogHelper.Log.Error(ex);
//    //            return InternalServerError();
//    //        }

//    //    }

//    //    [HttpGet]
//    //    public IHttpActionResult GridGetHoodFinalOfferElements([FromUri]HoodFinalOfferDetailsListGridParametersDto model)
//    //    {
//    //        try
//    //        {
//    //            User user = GetLoggedUser();
//    //            GridResultDto result = new HoodFinalOfferElementRepository().GridGetHoodFinalOfferElements(model, user.Id);

//    //            return Ok(result);
//    //        }
//    //        catch (Exception ex)
//    //        {
//    //            LogHelper.Log.Error(ex);
//    //            return InternalServerError();
//    //        }
//    //    }

//        //[HttpPost]
//        //public IHttpActionResult CopyHoodFinalOffer([FromBody]int hoodFinalOofferId)
//        //{
//        //    try
//        //    {
//        //        int? newOfferId = null;
//        //        using (var tran = TransactionHelper.CreateTransaction())
//        //        {
//        //            User loggedUser = GetLoggedUser();

//        //            var now = DateTime.Now; ;
//        //            var offerRepository = new HoodFinalOfferRepository();
//        //            var offer = offerRepository.GetById(hoodFinalOofferId);
//        //            var newOffer = MappingHelper.Mapper.Map<HoodFinalOffer>(offer);
//        //            newOffer.CreatedByUserId = loggedUser.Id;
//        //            newOffer.CreatedOn = now;
//        //            newOffer.IsActive = false;
//        //            newOffer.ModifiedByUserId = loggedUser.Id;
//        //            newOffer.ModifiedOn = now;
//        //            newOffer.OfferDate = now;
//        //            newOffer.OfferNumber = offerRepository.GetNextHoodFinalOfferNumberFromCopy(offer.OfferNumber);
//        //            newOffer.Status = OfferStatus.Draft.ToByte();
//        //            newOffer.CopiedFromHoodFinalOfferId = hoodFinalOofferId;
//        //            newOffer.OfferPdfFileId = null;
//        //            offerRepository.Add(newOffer);
//        //            newOfferId = newOffer.Id;

//        //            var offerElementRepository = new HoodFinalOfferElementRepository();
//        //            var offerElements = offerElementRepository.GetByHoodFinalOfferId(offer.Id);

//        //            foreach (var oe in offerElements)
//        //            {
//        //                var newOfferElement = MappingHelper.Mapper.Map<HoodFinalOfferElement>(oe);
//        //                newOfferElement.CreatedOn = now;
//        //                newOfferElement.CreatedByUserId = loggedUser.Id;
//        //                newOfferElement.ModifiedByUserId = loggedUser.Id;
//        //                newOfferElement.ModifiedOn = now;
//        //                newOfferElement.HoodFinalOffersId = newOffer.Id;

//        //                offerElementRepository.Add(newOfferElement);
//        //            }
//        //            tran.Complete();
//        //        }

//        //        return Ok(newOfferId);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpGet]
//        //public IHttpActionResult GetHoodFinalOfferData([FromUri]int hoodFinalOfferId)
//        //{
//        //    try
//        //    {
//        //        var offer = new HoodFinalOfferRepository().GetById(hoodFinalOfferId);
//        //        var region = new RegionRepository().GetById(offer.RegionId);
//        //        File fileLogo = offer.LogoFileId.HasValue
//        //            ? new FileRepository().GetById(offer.LogoFileId.Value)
//        //            : null;

//        //        Customer seller = new CustomerRepository().GetById(offer.SellerFirmaId);

//        //        var result = new HoodFinalOfferDetailsViewModel()
//        //        {
//        //            HFOCity = offer.City,
//        //            HFOLogo = fileLogo?.GeneratedFileName,
//        //            HFOOfferCompanyId = offer.CustomerOfferCompanyId,
//        //            HFOInstallationObjectId = offer.InstallationObjectObiektyId,
//        //            HFOOfferDate = offer.OfferDate,
//        //            HFOOfferNumber = SynergiaHelper.GetHoodFinalOfferNumber(offer.OfferNumber, region.Code),
//        //            HFOOfferId = offer.Id,
//        //            HFOCatalogValueNet = offer.CatalogValue,
//        //            HFOFinalValueAfterAllDiscountsNet = offer.FinalValueAfterAllDiscounts,
//        //            HFOStatusText = ((OfferStatus)offer.Status).GetDescription(),
//        //            HFOStatus = offer.Status,
//        //            HFOGuaranteeYearsAnsul = offer.GuaranteeYearsAnsul,
//        //            HFOGuaranteeYearsCookAir = offer.GuaranteeYearsCookAir,
//        //            HFOGuaranteeYearsHoods = offer.GuaranteeYearsHoods,
//        //            HFOGuaranteeYearsKES = offer.GuaranteeYearsKES,
//        //            HFOGuaranteeYearsSmoki = offer.GuaranteeYearsSmoki,
//        //            HFOGuaranteeYearsVentilators = offer.GuaranteeYearsVentilators,
//        //            HFOPaymentType = (OfferPaymentType)offer.PaymentType,
//        //            HFORegionId = offer.RegionId,
//        //            HFODeliveryTime = offer.DeliveryTime,
//        //            HFOPrepaymentPercent = offer.PrepaymentPercent,
//        //            HFODiscount = offer.Discount,
//        //            HFOContactEmail = offer.ContactEmail,
//        //            HFOContactPerson = offer.ContactPerson,
//        //            HFOContactPhone = offer.ContactPhone,
//        //            HFOComment = offer.Comment,
//        //            HFOHideDiscountInPdfFile = offer.HideDiscountInPdfFile,
//        //            HFOFixedValueAfterAllDiscounts = offer.FixedValueAfterAllDiscounts
//        //        };

//        //        return Ok(result);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public IHttpActionResult DeleteHoodFinalOfferElement([FromBody]int id)
//        //{
//        //    try
//        //    {
//        //        User loggedUser = GetLoggedUser();

//        //        var offerElementRepository = new HoodFinalOfferElementRepository();
//        //        var offerElement = offerElementRepository.GetById(id);
//        //        offerElement.ModifiedOn = DateTime.Now;
//        //        offerElement.ModifiedByUserId = loggedUser.Id;
//        //        offerElement.IsDeleted = true;
//        //        offerElementRepository.Update(offerElement);

//        //        SetValuesOnHoodFinalOffer(offerElement.HoodFinalOffersId);

//        //        return Ok(true);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public IHttpActionResult AddHoodFinalOfferElement([FromBody] AddHoodFinalOfferElementModel model)
//        //{
//        //    try
//        //    {
//        //        User loggedUser = GetLoggedUser();
//        //        var offerElementRepository = new HoodFinalOfferElementRepository();

//        //        var offerRepository = new HoodFinalOfferRepository();
//        //        var offer = offerRepository.GetById(model.HoodFinalOfferId);

//        //        if ((OfferStatus)offer.Status != OfferStatus.Draft)
//        //        {
//        //            return BadRequest("Status aktywnej oferty nie pozwala na dodanie produktu");
//        //        }

//        //        var offerElement = offerElementRepository.GetByHoodFinalOfferElementIdAndProductId(model.HoodFinalOfferId, model.ProductId, model.PersonalProductId);
//        //        decimal catalogPriceNet;
//        //        decimal discount = 0; //48;

//        //        PersonalProductRepository personalProductRepository = new PersonalProductRepository();
//        //        PersonalProduct personalProduct = model.PersonalProductId.HasValue
//        //            ? personalProductRepository.GetById(model.PersonalProductId.Value)
//        //            : null;
//        //        Product product = null;
//        //        if (personalProduct != null)
//        //        {
//        //            catalogPriceNet = personalProduct.PriceNet;
//        //        }
//        //        else
//        //        {
//        //            ProductRepository productRepository = new ProductRepository();
//        //            product = productRepository.GetById(model.ProductId.Value);
//        //            if (!product.PriceNet.HasValue)
//        //            {
//        //                return BadRequest("Produkt nie posiada ustawionej ceny"); ;
//        //            }
//        //            catalogPriceNet = Convert.ToDecimal(product.PriceNet.Value);
//        //        }

//        //        if (offerElement != null)
//        //        {
//        //            offerElement.ModifiedByUserId = loggedUser.Id;
//        //            offerElement.ModifiedOn = DateTime.Now;
//        //            offerElement.Discount = discount;
//        //            offerElement.Quantity = offerElement.Quantity + model.Quantity;
//        //            offerElement.PriceAfterDiscountNet = catalogPriceNet - (catalogPriceNet * discount) / 100;
//        //            offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

//        //            offerElementRepository.Update(offerElement);
//        //        }
//        //        else
//        //        {
//        //            HoodFinalOfferElementType offerElementType = HoodFinalOfferElementType.Other;
//        //            if (product != null)
//        //            {
//        //                //var priceFactor = 1.0M;
//        //                var mainGroup = new GroupRepository().GetMainGroup(product.GroupId.Value);
//        //                switch (mainGroup.Code.ToLower())
//        //                {
//        //                    case "systemy przeciwpożarowe":
//        //                        offerElementType = HoodFinalOfferElementType.Ansul;
//        //                        //priceFactor = 1.25M;
//        //                        break;
//        //                    case "centrale kuchenne":
//        //                        offerElementType = HoodFinalOfferElementType.CookAir;
//        //                        break;
//        //                    case "okapy":
//        //                        offerElementType = HoodFinalOfferElementType.Hood;
//        //                        //priceFactor = 3;
//        //                        break;
//        //                    case "optymalizacja energii":
//        //                        offerElementType = HoodFinalOfferElementType.KES;
//        //                        break;
//        //                }
//        //            }

//        //            var catalogPriceNetRounded = Math.Ceiling(catalogPriceNet / 100) * 100;
//        //            offerElement = new HoodFinalOfferElement()
//        //            {
//        //                CatalogPriceNet = catalogPriceNetRounded,
//        //                Discount = discount,
//        //                PriceAfterDiscountNet = catalogPriceNetRounded - (catalogPriceNetRounded * discount) / 100,
//        //                FinalValueNet = model.Quantity * (catalogPriceNetRounded - (catalogPriceNetRounded * discount) / 100),
//        //                HoodFinalOffersId = model.HoodFinalOfferId,
//        //                ProduktId = model.ProductId,
//        //                Quantity = model.Quantity,
//        //                CreatedOn = DateTime.Now,
//        //                CreatedByUserId = loggedUser.Id,
//        //                OwnerUserId = loggedUser.Id,
//        //                ModifiedByUserId = loggedUser.Id,
//        //                ModifiedOn = DateTime.Now,
//        //                IsDeleted = false,
//        //                PersonalProductId = model.PersonalProductId,
//        //                Type = offerElementType.ToByte(),
//        //                PurchasePriceNet = catalogPriceNet,
//        //                PriceFactor = 1
//        //            };
//        //            offerElementRepository.Add(offerElement);
//        //        }

//        //        SetValuesOnHoodFinalOffer(model.HoodFinalOfferId);

//        //        return Ok(offerElement.Id);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public IHttpActionResult SaveHoodFinalOfferElementQuantity([FromBody] SaveHoodFinalOfferElementQuantityModel model)
//        //{
//        //    try
//        //    {
//        //        User loggedUser = GetLoggedUser();
//        //        var offerElementRepository = new HoodFinalOfferElementRepository();
//        //        var offerElement = offerElementRepository.GetById(model.HoodFinalOfferElementId);
//        //        decimal catalogPriceNet = offerElement.CatalogPriceNet;
//        //        decimal discount = 0;// 48;

//        //        if (offerElement != null)
//        //        {
//        //            offerElement.ModifiedByUserId = loggedUser.Id;
//        //            offerElement.ModifiedOn = DateTime.Now;
//        //            offerElement.Discount = discount;
//        //            offerElement.Quantity = model.Quantity;
//        //            offerElement.PriceAfterDiscountNet = catalogPriceNet - (catalogPriceNet * discount) / 100;
//        //            offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

//        //            offerElementRepository.Update(offerElement);
//        //            SetValuesOnHoodFinalOffer(offerElement.HoodFinalOffersId);

//        //            return Ok(offerElement.Id);
//        //        }
//        //        return StatusCode(HttpStatusCode.NotAcceptable);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public IHttpActionResult SaveHoodFinalOfferElementDiscount([FromBody] SaveHoodFinalOfferElementDiscountParametersDto model)
//        //{
//        //    try
//        //    {
//        //        User loggedUser = GetLoggedUser();
//        //        var offerElementRepository = new HoodFinalOfferElementRepository();
//        //        List<HoodFinalOfferElement> offerElements = new List<HoodFinalOfferElement>();
//        //        if (model.HoodFinalOfferElementId.HasValue)
//        //        {
//        //            var offerElement = offerElementRepository.GetById(model.HoodFinalOfferElementId.Value);
//        //            offerElements.Add(offerElement);
//        //        }
//        //        else
//        //        {
//        //            var offerElementsFromDB = offerElementRepository.GetByHoodFinalOfferId(model.HoodFinalOfferId);
//        //            offerElements.AddRange(offerElementsFromDB);

//        //            var offerRepository = new HoodFinalOfferRepository();
//        //            var offer = offerRepository.GetById(model.HoodFinalOfferId);
//        //            offer.Discount = model.Discount;
//        //            offerRepository.Update(offer);
//        //        }

//        //        if (offerElements.Any())
//        //        {
//        //            foreach (var offerElement in offerElements)
//        //            {
//        //                offerElement.ModifiedByUserId = loggedUser.Id;
//        //                offerElement.ModifiedOn = DateTime.Now;
//        //                offerElement.Discount = model.Discount;
//        //                offerElement.PriceAfterDiscountNet = offerElement.CatalogPriceNet - (offerElement.CatalogPriceNet * offerElement.Discount) / 100;
//        //                offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

//        //                offerElementRepository.Update(offerElement);
//        //            }

//        //            SetValuesOnHoodFinalOffer(model.HoodFinalOfferId);
//        //            return Ok(true);
//        //        }
//        //        return StatusCode(HttpStatusCode.NotAcceptable);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public IHttpActionResult SaveHoodFinalOfferElementPriceFactor([FromBody] SaveHoodFinalOfferElementPriceFactorParametersDto model)
//        //{
//        //    try
//        //    {
//        //        User loggedUser = GetLoggedUser();
//        //        var offerElementRepository = new HoodFinalOfferElementRepository();
//        //        var offerElement = offerElementRepository.GetById(model.HoodFinalOfferElementId);

//        //        if (offerElement != null)
//        //        {
//        //            offerElement.ModifiedByUserId = loggedUser.Id;
//        //            offerElement.ModifiedOn = DateTime.Now;
//        //            offerElement.PriceFactor = model.PriceFactor;
//        //            offerElement.CatalogPriceNet = offerElement.Type != HoodFinalOfferElementType.Ventilator.ToByte() 
//        //                ? Math.Ceiling(offerElement.PurchasePriceNet * offerElement.PriceFactor / 100) * 100
//        //                : offerElement.PurchasePriceNet * offerElement.PriceFactor;
//        //            offerElement.PriceAfterDiscountNet = offerElement.CatalogPriceNet - (offerElement.CatalogPriceNet * offerElement.Discount) / 100;
//        //            offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

//        //            offerElementRepository.Update(offerElement);
//        //            SetValuesOnHoodFinalOffer(offerElement.HoodFinalOffersId);
//        //            return Ok(offerElement.Id);
//        //        }
//        //        return StatusCode(HttpStatusCode.NotAcceptable);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return InternalServerError();
//        //    }
//        //}

//        //[HttpPost]
//        //public bool SetHoodFinalOfferStatus([FromBody] SetHoodFinalOfferStatusParametersDto model)
//        //{
//        //    try
//        //    {
//        //        bool result = false;
//        //        User loggedUser = GetLoggedUser();

//        //        using (TransactionScope tran = new TransactionScope())
//        //        {
//        //            var offerRepository = new HoodFinalOfferRepository();
//        //            var offer = offerRepository.GetById(model.HoodFinalOfferId);

//        //            if (offer != null && offer.Status < model.Status.ToByte())
//        //            {
//        //                result = true;
//        //                offer.Status = model.Status.ToByte();
//        //                offer.ModifiedByUserId = loggedUser.Id;
//        //                offer.ModifiedOn = DateTime.Now;

//        //                if (result)
//        //                {
//        //                    offerRepository.Update(offer);
//        //                    if (offer.Status == (byte)OfferStatus.Ordered)
//        //                    {
//        //                        var finishedOfferPdfFile = new FinishedHoodFinalOfferPdfService(offer.Id, loggedUser.Id).Print();
//        //                        if (finishedOfferPdfFile != null)
//        //                        {
//        //                            int? finishedOfferPdfFileId = new FileRepository().Save(finishedOfferPdfFile, FileType.OfferPdf);
//        //                            if (finishedOfferPdfFileId.HasValue)
//        //                            {
//        //                                offer.OfferPdfFileId = finishedOfferPdfFileId;
//        //                                offerRepository.Update(offer);
//        //                            }
//        //                            else
//        //                            {
//        //                                result = false;
//        //                            }
//        //                        }
//        //                        else
//        //                        {
//        //                            result = false;
//        //                        }

//        //                        if (result)
//        //                        {
//        //                            int? createFromOfferResult = CreateOrderFromOffer(offer, loggedUser);
//        //                            if (!createFromOfferResult.HasValue)
//        //                            {
//        //                                result = false;
//        //                            }
//        //                        }
//        //                    }
//        //                }
//        //            }

//        //            if (result)
//        //            {
//        //                tran.Complete();
//        //            }
//        //        }

//        //        return result;
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return false;
//        //    }
//        //}

//        private int? CreateOrderFromOffer(HoodFinalOffer hoodFinalOffer, User loggedUser)
//        {
//            try
//            {
//                int? result = null;
//                var orderRepository = new HoodOrderRepository();
//                var orderElementRepository = new HoodOrderElementRepository();
//                List<int> createdOrderIds = new List<int>();

//                OfferCompany offerComany = new OfferCompanyRepository().GetById(hoodFinalOffer.CustomerOfferCompanyId.Value);

//                List<HoodFinalOfferElementType> hoodFinalOfferElementTypes = new HoodFinalOfferElementRepository().GetHoodFinalOfferElementTypes(hoodFinalOffer.Id);
//                DateTime now = DateTime.Now;

//                foreach (var hoodFinalOfferElementType in hoodFinalOfferElementTypes)
//                {
//                    var order = MappingHelper.Mapper.Map<HoodOrder>(hoodFinalOffer);
//                    order.Id = 0;
//                    order.OrderNumber = orderRepository.GetNextOrderNumber(hoodFinalOfferElementType);
//                    order.HoodFinalOfferId = hoodFinalOffer.Id;
//                    order.CustomerId = hoodFinalOffer.CustomerOfferCompanyId;
//                    order.CustomerAddress = offerComany.Address;
//                    order.CustomerCity = offerComany.City;
//                    order.CustomerName = offerComany.Name;
//                    order.CustomerCode = offerComany.Name.Truncate(50);
//                    order.CustomerCountryCode = "PL";
//                    order.CustomerVATId = offerComany.NIP;
//                    order.CustomerPostalCode = offerComany.PostalCode;
//                    order.InstallationObjectId = hoodFinalOffer.InstallationObjectObiektyId;
//                    order.OrderDate = now;
//                    order.Status = OrderStatus.Sent.ToByte();
//                    order.CreatedByUserId = loggedUser.Id;
//                    order.ModifiedByUserId = loggedUser.Id;
//                    order.CreatedOn = now;
//                    order.ModifiedOn = now;
//                    order.OrderType = SynergiaHelper.GetHoodFinalOfferElementTypeCode(hoodFinalOfferElementType);
//                    order.Type = hoodFinalOfferElementType.ToByte();

//                    orderRepository.Add(order);
//                    result = order.Id;
//                    createdOrderIds.Add(order.Id);

//                    if (result.HasValue)
//                    {
//                        bool createOrderElementsResult = CreateOrderElementsfromOfferElements(hoodFinalOffer.Id, order.Id, loggedUser, hoodFinalOfferElementType);
//                        if (createOrderElementsResult == false)
//                        {
//                            result = null;
//                        }
//                    }
//                    if (result.HasValue)
//                    {
//                        var orderElements = orderElementRepository.GetByHoodOrderId(order.Id);
//                        if (orderElements.Any())
//                        {
//                            order.CatalogValue = orderElements.Sum(o => o.CatalogPriceNet * o.Quantity);
//                            order.ValueAfterPrimatyDiscount = orderElements.Sum(o => o.FinalValueNet);
//                            //if (order.IsPrepayment == true)
//                            //{
//                            //    order.FinalValueAfterAllDiscounts = order.ValueAfterPrimatyDiscount - (order.CatalogValue * (decimal)0.02);
//                            //}
//                            //else
//                            //{
//                            order.FinalValueAfterAllDiscounts = order.ValueAfterPrimatyDiscount;
//                            //}
//                            orderRepository.Update(order);
//                        }
//                        else
//                        {
//                            result = null;
//                        }
//                    }

//                    if (result.HasValue)
//                    {
//                        var orderPdfFile = new HoodOrderPdfService(order.Id, loggedUser.Id).Print();
//                        if (orderPdfFile != null)
//                        {
//                            int? orderPdfFileId = new FileRepository().Save(orderPdfFile, FileType.OrderPdf);
//                            if (orderPdfFileId.HasValue)
//                            {
//                                order.OrderPdfFileId = orderPdfFileId;
//                                orderRepository.Update(order);
//                            }
//                            else
//                            {
//                                result = null;
//                            }
//                        }
//                        else
//                        {
//                            result = null;
//                        }
//                    }

//                    if (!result.HasValue)
//                    {
//                        return null;
//                    }
//                }

//                var orderMailMessageService = new HoodOrderMailMessageService(createdOrderIds);
//                orderMailMessageService.Send();

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        private bool CreateOrderElementsfromOfferElements(int hoodFinalOfferId, int hoodOrderId, User loggedUser, HoodFinalOfferElementType hoodFinalOfferElementType)
//        {
//            try
//            {
//                var offerElementRepository = new HoodFinalOfferElementRepository();
//                var orderElementRepository = new HoodOrderElementRepository();
//                var offerElements = offerElementRepository.GetByHoodFinalOfferId(hoodFinalOfferId, hoodFinalOfferElementType);
//                var offerelementsGrid = offerElementRepository.GridGetHoodFinalOfferElements(new HoodFinalOfferDetailsListGridParametersDto()
//                {
//                    HoodFinalOfferId = hoodFinalOfferId,
//                    Length = int.MaxValue,
//                    Start = 0
//                }, loggedUser.Id).Data as List<pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList_Result>;

//                foreach (var oe in offerElements)
//                {
//                    var offerElementFromGrid = offerelementsGrid.Where(x => x.Id == oe.Id).Single();

//                    var orderElement = MappingHelper.Mapper.Map<HoodOrderElement>(oe);
//                    orderElement.Id = 0;
//                    orderElement.HoodOrderId = hoodOrderId;
//                    orderElement.CreatedByUserId = loggedUser.Id;
//                    orderElement.CreatedOn = DateTime.Now;
//                    orderElement.ModifiedByUserId = loggedUser.Id;
//                    orderElement.ModifiedOn = DateTime.Now;
//                    orderElement.OwnerByUserId = oe.OwnerUserId;
//                    orderElement.HoodFinalOfferElementId = oe.Id;
//                    orderElement.ProductCode = offerElementFromGrid.ProductCode;
//                    orderElement.FinalValueVAT = Math.Round(oe.FinalValueNet * 0.23M, 2, MidpointRounding.AwayFromZero);
//                    orderElement.UoM = "szt.";
//                    orderElement.VATRate = 23;
//                    orderElementRepository.Add(orderElement);
//                }
//                return true;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return false;
//            }
//        }

//        private bool SetValuesOnHoodFinalOffer(int hoodFinalOofferId)
//        {
//            try
//            {
//                var hoodFinalOfferRepository = new HoodFinalOfferRepository();
//                var offerElements = new HoodFinalOfferElementRepository().GetByHoodFinalOfferId(hoodFinalOofferId);
//                var sumCatalogValue = offerElements.Sum(o => o.CatalogPriceNet * o.Quantity);
//                var sumValueAfterPrimaryDiscount = offerElements.Sum(o => o.FinalValueNet);
//                var hoodFinalOffer = hoodFinalOfferRepository.GetById(hoodFinalOofferId);
//                hoodFinalOffer.ValueAfterPrimatyDiscount = sumValueAfterPrimaryDiscount;
//                hoodFinalOffer.CatalogValue = sumCatalogValue;
//                hoodFinalOffer.FinalValueAfterAllDiscounts = sumValueAfterPrimaryDiscount;
//                hoodFinalOfferRepository.Update(hoodFinalOffer);

//                return true;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return false;
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult DeleteHoodFinalOffer([FromBody]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                var offerRepository = new HoodFinalOfferRepository();
//                var offer = offerRepository.GetById(id);
//                offer.ModifiedOn = DateTime.Now;
//                offer.ModifiedByUserId = loggedUser.Id;
//                offer.IsDeleted = true;
//                offerRepository.Update(offer);

//                return Ok(true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult SaveHoodFinalOffer([FromBody]HoodFinalOfferDetailsViewModel model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                var offerRepository = new HoodFinalOfferRepository();
//                var offer = model.HFOOfferId.HasValue
//                    ? offerRepository.GetById(model.HFOOfferId.Value)
//                    : new HoodFinalOffer();
//                if (offer.Status != OfferStatus.Ordered.ToByte())
//                {
//                    if (offer.Id > 0)
//                    {
//                        #region OfferCompany
//                        if (model.HFOOfferCompanyId.HasValue || !string.IsNullOrEmpty(model.HFOOfferCompanyName))
//                        {
//                            OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
//                            OfferCompany offerCompany = null;
//                            if (!model.HFOOfferCompanyId.HasValue && !string.IsNullOrEmpty(model.HFOOfferCompanyName))
//                            {
//                                offerCompany = new OfferCompany
//                                {
//                                    CreatedByUserId = loggedUser.Id,
//                                    CreatedOn = DateTime.Now,
//                                    OwnerUserId = loggedUser.Id
//                                };
//                            }
//                            else
//                            {
//                                offerCompany = offerCompanyRepository.GetById(model.HFOOfferCompanyId.Value);
//                            }

//                            offerCompany.City = model.HFOOfferCompanyCity;
//                            offerCompany.Address = model.HFOOfferCompanyAddress;
//                            offerCompany.Name = model.HFOOfferCompanyName;
//                            offerCompany.NIP = model.HFOOfferCompanyNIP;
//                            offerCompany.PostalCode = model.HFOOfferCompanyPostalCode;
//                            offerCompany.ModifiedOn = DateTime.Now;
//                            offerCompany.ModifiedByUserId = loggedUser.Id;

//                            if (offerCompany.Id == 0)
//                            {
//                                offerCompanyRepository.Add(offerCompany);
//                                model.HFOOfferCompanyId = offerCompany.Id;
//                            }
//                            else
//                            {
//                                offerCompanyRepository.Update(offerCompany);
//                            }
//                        }
//                        #endregion

//                        offer.Comment = model.HFOComment;
//                        offer.CustomerOfferCompanyId = model.HFOOfferCompanyId;

//                        if (offer.Status == OfferStatus.Draft.ToByte())
//                        {
//                            #region InstallationObject
//                            //if (!model.HFOInstallationObjectId.HasValue && !string.IsNullOrEmpty(model.HFOInstallationObjectName))
//                            //{
//                            //    if (model.HFOOfferCompanyId.HasValue)
//                            //    {
//                            //        InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
//                            //        InstallationObject installationObject = new InstallationObject();

//                            //        installationObject.Address = model.HFOInstallationObjectAddress;
//                            //        installationObject.City = model.HFOInstallationObjectCity;
//                            //        installationObject.Country = model.HFOInstallationObjectCountry;
//                            //        installationObject.Name = model.HFOInstallationObjectName;
//                            //        installationObject.PostalCode = model.HFOInstallationObjectPostalCode;
//                            //        installationObject.Type = model.HFOInstallationObjectType;
//                            //        installationObject.Status = (int)InstallationObjectStatus.Existing;
//                            //        installationObject.OfferCompanyId = model.HFOOfferCompanyId;
//                            //        installationObjectRepository.Add(installationObject);
//                            //        model.HFOInstallationObjectId = installationObject.Id;
//                            //    }
//                            //}
//                            #endregion

//                            offer.OfferDate = model.HFOOfferDate;
//                            offer.City = model.HFOCity;
//                            offer.InstallationObjectObiektyId = model.HFOInstallationObjectId;
//                            offer.ModifiedOn = DateTime.Now;
//                            offer.ModifiedByUserId = loggedUser.Id;
//                            offer.PrepaymentPercent = model.HFOPrepaymentPercent;
//                            offer.PaymentType = model.HFOPaymentType.ToByte();
//                            offer.DeliveryTime = model.HFODeliveryTime;
//                            offer.GuaranteeYearsAnsul = model.HFOGuaranteeYearsAnsul;
//                            offer.GuaranteeYearsCookAir = model.HFOGuaranteeYearsCookAir;
//                            offer.GuaranteeYearsHoods = model.HFOGuaranteeYearsHoods;
//                            offer.GuaranteeYearsKES = model.HFOGuaranteeYearsKES;
//                            offer.GuaranteeYearsSmoki = model.HFOGuaranteeYearsSmoki;
//                            offer.GuaranteeYearsVentilators = model.HFOGuaranteeYearsVentilators;
//                            offer.RegionId = model.HFORegionId;
//                            offer.Discount = model.HFODiscount;
//                            offer.ContactEmail = model.HFOContactEmail;
//                            offer.ContactPerson = model.HFOContactPerson;
//                            offer.ContactPhone = model.HFOContactPhone;
//                            offer.HideDiscountInPdfFile = model.HFOHideDiscountInPdfFile;
//                            offer.FixedValueAfterAllDiscounts = model.HFOFixedValueAfterAllDiscounts;

//                            offerRepository.Update(offer);
//                            SetValuesOnHoodFinalOffer(offer.Id);

//                            #region InstallationObject
//                            var installactionObjectRepository = new InstallationObjectRepository();
//                            if (offer.InstallationObjectObiektyId.HasValue || !string.IsNullOrEmpty(model.HFOInstallationObjectName))
//                            {
//                                var installationObject = offer.InstallationObjectObiektyId.HasValue
//                                    ? installactionObjectRepository.GetById(offer.InstallationObjectObiektyId.Value)
//                                    : new InstallationObject();
//                                installationObject.CRMModifiedOn = DateTime.Now;
//                                installationObject.Address = model.HFOInstallationObjectAddress;
//                                installationObject.City = model.HFOInstallationObjectCity;
//                                installationObject.Country = model.HFOInstallationObjectCountry;
//                                if (!string.IsNullOrEmpty(model.HFOInstallationObjectName))
//                                {
//                                    installationObject.Name = model.HFOInstallationObjectName;
//                                }
//                                installationObject.PostalCode = model.HFOInstallationObjectPostalCode;
//                                installationObject.Type = model.HFOInstallationObjectType;
//                                if (offer.CustomerOfferCompanyId.HasValue)
//                                {
//                                    if (installationObject.OfferCompanyId != offer.CustomerOfferCompanyId)
//                                    {
//                                        installationObject.OfferCompanyId = offer.CustomerOfferCompanyId;
//                                    }
//                                }
//                                installactionObjectRepository.Save(installationObject);
//                                offer.InstallationObjectObiektyId = installationObject.Id;
//                                offerRepository.Update(offer);
//                            }
//                            #endregion
//                        }
//                        else
//                        {
//                            offerRepository.Update(offer);
//                        }
//                    }
//                    //else
//                    //{
//                    //    offer.Status = OfferStatus.Draft.ToByte();
//                    //    offer.OfferNumber = offerRepository.GetNextOfferNumber(loggedUser.CustomerId);
//                    //    offer.CreatedByUserId = loggedUser.Id;
//                    //    offer.SellerFirmaId = loggedUser.CustomerId;
//                    //    offer.CreatedOn = DateTime.Now;
//                    //    offer.OwnerUserId = loggedUser.Id;
//                    //    offer.ModifiedOn = DateTime.Now;
//                    //    offer.ModifiedByUserId = loggedUser.Id;
//                    //    offer.OfferDate = DateTime.Now;
//                    //    offer.LogoFileId = loggedUser.OfferLogoFileId;
//                    //    offer.GuaranteeYears = 2;
//                    //    offer.DeliveryTimeDays = 25;
//                    //    offer.PaymentType = OfferPaymentType.MoneyTransfer14Days.ToByte();
//                    //    offer.PrepaymentPercent = 30;

//                    //    offerRepository.Add(offer);
//                    //}
//                }
//                return Ok(offer.Id);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult SaveHoodFinalOfferFixedValueAfterAllDiscounts([FromBody] SaveHoodFinalOfferFixedValueAfterAllDiscountsParametersDto model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                var offerRepository = new HoodFinalOfferRepository();
//                var offer = offerRepository.GetById(model.HoodFinalOfferId);
//                if (model.FixedValueAfterAllDiscounts > offer.CatalogValue)
//                {
//                    return BadRequest("Podana wartość jest wyższa niż łączna wartość oferty");
//                }

//                if (model.FixedValueAfterAllDiscounts < 0)
//                {
//                    return BadRequest("Podana wartość jest błędna");
//                }

//                using (var tran = TransactionHelper.CreateTransaction())
//                {
//                    decimal discount = model.FixedValueAfterAllDiscounts > 0
//                        ? 100 - Math.Round((model.FixedValueAfterAllDiscounts.Value * 100) / offer.CatalogValue, 1)
//                        : 0;

//                    var offerElementRepository = new HoodFinalOfferElementRepository();
//                    List<HoodFinalOfferElement> offerElements = offerElementRepository.GetByHoodFinalOfferId(model.HoodFinalOfferId);

//                    foreach (var offerElement in offerElements)
//                    {
//                        offerElement.ModifiedByUserId = loggedUser.Id;
//                        offerElement.ModifiedOn = DateTime.Now;
//                        offerElement.Discount = discount;
//                        offerElement.PriceAfterDiscountNet = offerElement.CatalogPriceNet - (offerElement.CatalogPriceNet * offerElement.Discount) / 100;
//                        offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

//                        offerElementRepository.Update(offerElement);
//                    }

//                    if (model.FixedValueAfterAllDiscounts > 0)
//                    {
//                        decimal differenceFromExpectedValue = model.FixedValueAfterAllDiscounts.Value - offerElements.Sum(x => x.FinalValueNet);
//                        if (differenceFromExpectedValue != 0)
//                        {
//                            var firstOfferElement = offerElements.First();
//                            firstOfferElement.PriceAfterDiscountNet += differenceFromExpectedValue / firstOfferElement.Quantity;
//                            firstOfferElement.FinalValueNet += differenceFromExpectedValue;
//                            offerElementRepository.Update(firstOfferElement);
//                        }
//                    }

//                    offer.Discount = discount;
//                    offer.FixedValueAfterAllDiscounts = model.FixedValueAfterAllDiscounts > 0 
//                        ? model.FixedValueAfterAllDiscounts 
//                        : null;
//                    offerRepository.Update(offer);

//                    SetValuesOnHoodFinalOffer(model.HoodFinalOfferId);

//                    tran.Complete();
//                }
//                return Ok(true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }
//    }
//}