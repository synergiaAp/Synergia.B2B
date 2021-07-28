using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Dto.Api.Offer;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Repository.Services.Mail;
using Synergia.B2B.Repository.Services.Pdf;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, MarenoOffersAndOrders")]
    public class ApiOffersController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetOffers([FromUri]OffersListGridParametersDto model)
        {
            try
            {
                User user = GetLoggedUser();
                OfferRepository offerRepository = new OfferRepository();
                GridResultDto result = offerRepository.GridGetOffers(model, user.Id);

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpGet]
        public GridResultDto GridGetOfferElements([FromUri]OfferDetailsListGridParametersDto model)
        {
            try
            {
                User user = GetLoggedUser();
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                GridResultDto result = offerElementRepository.GridGetOfferElements(model, user.Id);

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpPost]
        public int? CopyOffer([FromBody]int offerId)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                OfferRepository offerRepository = new OfferRepository();
                Offer offer = offerRepository.GetById(offerId);
                Offer newOffer = new Offer()
                {
                    CatalogValue = offer.CatalogValue,
                    City = offer.City,
                    CreatedByUserId = loggedUser.Id,
                    CreatedOn = DateTime.Now,
                    CustomerOfferCompanyId = offer.CustomerOfferCompanyId,
                    FinalValueAfterAllDiscounts = offer.FinalValueAfterAllDiscounts,
                    InstallationObjectObiektyId = offer.InstallationObjectObiektyId,
                    IsActive = false,
                    IsDeleted = false,
                    LogoFileId = offer.LogoFileId,
                    ModifiedByUserId = loggedUser.Id,
                    ModifiedOn = DateTime.Now,
                    OfferDate = DateTime.Now,
                    OfferNumber = offerRepository.GetNextOfferNumberFromCopy(offer.SellerFirmaId, offer.OfferNumber),
                    OwnerUserId = offer.OwnerUserId,
                    SellerFirmaId = offer.SellerFirmaId,
                    Status = OfferStatus.Draft.ToByte(),
                    ValueAfterPrimatyDiscount = offer.ValueAfterPrimatyDiscount,
                    CopiedFromOfferId = offerId,
                    IsPrepayment = offer.IsPrepayment,
                    PrepaymentPercent = offer.PrepaymentPercent,
                    PaymentType = offer.PaymentType,
                    DeliveryTimeDays = offer.DeliveryTimeDays,
                    GuaranteeYears = offer.GuaranteeYears,
                    WithEmptyInstallationObjectObiektyId = offer.WithEmptyInstallationObjectObiektyId,
                    HasOnlyInnoSavaProducts = offer.HasOnlyInnoSavaProducts,
                    DeliveryCost = offer.DeliveryCost,
                    DeliveryType = offer.DeliveryType
                };
                offerRepository.Add(newOffer);

                OfferElementRepository offerElementRepository = new OfferElementRepository();
                IEnumerable<OfferElement> offerElements = offerElementRepository.GetByOfferId(offer.Id);

                foreach (OfferElement oe in offerElements)
                {
                    OfferElement newOfferElement = new OfferElement()
                    {
                        CatalogPriceNet = oe.CatalogPriceNet,
                        CreatedOn = DateTime.Now,
                        CreatedByUserId = loggedUser.Id,
                        Discount = oe.Discount,
                        FinalValueNet = oe.FinalValueNet,
                        IsDeleted = false,
                        ModifiedByUserId = loggedUser.Id,
                        ModifiedOn = DateTime.Now,
                        OffersId = newOffer.Id,
                        OwnerUserId = oe.OwnerUserId,
                        PersonalProductId = oe.PersonalProductId,
                        PriceAfterDiscountNet = oe.PriceAfterDiscountNet,
                        ProduktId = oe.ProduktId,
                        Quantity = oe.Quantity,
                        DeliveryTimeDays = oe.DeliveryTimeDays
                    };
                    offerElementRepository.Add(newOfferElement);
                }

                return newOffer.Id;

            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public OffersViewModel GetOfferData([FromUri]int offerId)
        {
            try
            {
                OfferRepository offerRepository = new OfferRepository();
                Offer offer = offerRepository.GetById(offerId);
                File fileLogo = offer.LogoFileId.HasValue
                    ? new FileRepository().GetById(offer.LogoFileId.Value)
                    : null;

                CustomerRepository customerRepository = new CustomerRepository();
                Customer seller = customerRepository.GetById(offer.SellerFirmaId);

                OffersViewModel result = new OffersViewModel()
                {
                    City = offer.City,
                    Logo = fileLogo?.GeneratedFileName,
                    OfferCompanyId = offer.CustomerOfferCompanyId,
                    InstallationObjectId = offer.InstallationObjectObiektyId,
                    OfferDate = offer.OfferDate,
                    OfferNumber = offer.OfferNumber,
                    SellerName = seller.Name,
                    SellerFirmaId = offer.SellerFirmaId,
                    OfferId = offer.Id,
                    CatalogValueNet = offer.CatalogValue,
                    FinalValueAfterAllDiscountsNet = offer.FinalValueAfterAllDiscounts,
                    ValueAfterPrimatyDiscountNet = offer.ValueAfterPrimatyDiscount,
                    StatusText = ((OfferStatus)offer.Status).GetDescription(),
                    Status = offer.Status,
                    PrepaymentPercent = offer.PrepaymentPercent,
                    DeliveryTimeDays = offer.DeliveryTimeDays,
                    GuaranteeYears = offer.GuaranteeYears,
                    PaymentType = (OfferPaymentType)offer.PaymentType,
                    WithEmptyInstallationObjectObiektyId = offer.WithEmptyInstallationObjectObiektyId,
                    HasOnlyInnoSavaProducts = offer.HasOnlyInnoSavaProducts,
                    DeliveryType = (OfferDeliveryType)offer.DeliveryType,
                    DeliveryCost = offer.DeliveryCost
                };

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public bool DeleteOfferElement([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                OfferElementRepository offerElementRepository = new OfferElementRepository();
                OfferElement offerElement = offerElementRepository.GetById(id);
                offerElement.ModifiedOn = DateTime.Now;
                offerElement.ModifiedByUserId = loggedUser.Id;
                offerElement.IsDeleted = true;
                offerElementRepository.Update(offerElement);

                SetValuesOnOffer(offerElement.OffersId);

                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        [HttpPost]
        public IHttpActionResult AddOfferElement([FromBody] AddOfferElementModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferElementRepository offerElementRepository = new OfferElementRepository();

                OfferRepository offerRepository = new OfferRepository();
                var offer = offerRepository.GetById(model.OfferId);

                if ((OfferStatus)offer.Status != OfferStatus.Draft)
                {
                    return BadRequest("Status aktywnej oferty nie pozwala na dodanie produktu");
                }

                OfferElement offerElement = offerElementRepository.GetByOfferIdAndProductId(model.OfferId, model.ProductId, model.PersonalProductId);
                decimal catalogPriceNet;                                           // Do zmiany po dodaniu ceny, jest na sztywno !!!!!!!!!!!! 
                decimal discount = 48;

                PersonalProductRepository personalProductRepository = new PersonalProductRepository();
                PersonalProduct personalProduct = model.PersonalProductId.HasValue
                    ? personalProductRepository.GetById(model.PersonalProductId.Value)
                    : null;
                if (personalProduct != null)
                {
                    catalogPriceNet = personalProduct.PriceNet;
                }
                else
                {
                    ProductRepository productRepository = new ProductRepository();
                    Product product = productRepository.GetById(model.ProductId.Value);
                    if (!product.PriceNet.HasValue)
                        return null;
                    catalogPriceNet = Convert.ToDecimal(product.PriceNet.Value);
                }

                if (offerElement != null)
                {
                    offerElement.ModifiedByUserId = loggedUser.Id;
                    offerElement.ModifiedOn = DateTime.Now;
                    offerElement.Discount = discount;
                    offerElement.Quantity = offerElement.Quantity + model.Quantity;
                    offerElement.PriceAfterDiscountNet = catalogPriceNet - (catalogPriceNet * discount) / 100;
                    offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

                    offerElementRepository.Update(offerElement);
                }
                else
                {
                    offerElement = new OfferElement()
                    {
                        CatalogPriceNet = catalogPriceNet,
                        Discount = discount,
                        PriceAfterDiscountNet = catalogPriceNet - (catalogPriceNet * discount) / 100,
                        FinalValueNet = model.Quantity * (catalogPriceNet - (catalogPriceNet * discount) / 100),
                        OffersId = model.OfferId,
                        ProduktId = model.ProductId,
                        Quantity = model.Quantity,
                        CreatedOn = DateTime.Now,
                        CreatedByUserId = loggedUser.Id,
                        OwnerUserId = loggedUser.Id,
                        ModifiedByUserId = loggedUser.Id,
                        ModifiedOn = DateTime.Now,
                        IsDeleted = false,
                        PersonalProductId = model.PersonalProductId,
                        DeliveryTimeDays = offer.DeliveryTimeDays
                    };
                    offerElementRepository.Add(offerElement);
                }

                SetValuesOnOffer(model.OfferId);

                return Ok(offerElement.Id);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return InternalServerError();
            }
        }

        [HttpPost]
        public int? SaveOfferElementQuantity([FromBody] SaveOfferElementQuantityModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                OfferElement offerElement = offerElementRepository.GetById(model.OfferElementId);
                decimal catalogPriceNet = offerElement.CatalogPriceNet;                                           // Do zmiany po dodaniu ceny, jest na sztywno !!!!!!!!!!!! 
                decimal discount = 48;

                if (offerElement != null)
                {
                    offerElement.ModifiedByUserId = loggedUser.Id;
                    offerElement.ModifiedOn = DateTime.Now;
                    offerElement.Discount = discount;
                    offerElement.Quantity = model.Quantity;
                    offerElement.PriceAfterDiscountNet = catalogPriceNet - (catalogPriceNet * discount) / 100;
                    offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

                    offerElementRepository.Update(offerElement);
                    SetValuesOnOffer(offerElement.OffersId);
                }

                return offerElement?.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public int? SaveOfferElementDiscount([FromBody] SaveOfferElementDiscountParametersDto model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                OfferElement offerElement = offerElementRepository.GetById(model.OfferElementId);

                if (offerElement != null)
                {
                    offerElement.ModifiedByUserId = loggedUser.Id;
                    offerElement.ModifiedOn = DateTime.Now;
                    offerElement.Discount = model.Discount;
                    offerElement.PriceAfterDiscountNet = offerElement.CatalogPriceNet - (offerElement.CatalogPriceNet * offerElement.Discount) / 100;
                    offerElement.FinalValueNet = offerElement.Quantity * offerElement.PriceAfterDiscountNet;

                    offerElementRepository.Update(offerElement);
                    SetValuesOnOffer(offerElement.OffersId);
                }

                return offerElement?.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public int? SaveOfferElementDeliveryTimeDays([FromBody] SaveOfferElementDeliveryTimeDaysParametersDto model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                List<OfferElement> offerElements = null;
                if (model.OfferElementId.HasValue)
                {
                    offerElements = new List<OfferElement>();
                    offerElements.Add(offerElementRepository.GetById(model.OfferElementId.Value));
                }
                else
                {
                    offerElements = offerElementRepository.GetByOfferId(model.OfferId);

                    OfferRepository offerRepository = new OfferRepository();
                    var offer = offerRepository.GetById(model.OfferId);
                    offer.DeliveryTimeDays = model.DeliveryTimeDays;
                    offerRepository.Update(offer);
                }

                if (offerElements != null)
                {
                    foreach (var offerElement in offerElements)
                    {
                        offerElement.ModifiedByUserId = loggedUser.Id;
                        offerElement.ModifiedOn = DateTime.Now;
                        offerElement.DeliveryTimeDays = model.DeliveryTimeDays;
                        offerElementRepository.Update(offerElement);
                    }
                }

                return 1;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public bool SetOfferStatus([FromBody] SetOfferStatusParametersDto model)
        {
            try
            {
                bool result = false;
                User loggedUser = GetLoggedUser();

                using (TransactionScope tran = new TransactionScope())
                {
                    OfferRepository offerRepository = new OfferRepository();
                    Offer offer = offerRepository.GetById(model.OfferId);

                    if (offer != null && offer.Status < model.Status.ToByte())
                    {
                        result = true;
                        offer.Status = model.Status.ToByte();
                        offer.ModifiedByUserId = loggedUser.Id;
                        offer.ModifiedOn = DateTime.Now;

                        if (model.Status == OfferStatus.Finished)
                        {
                            var finishedOfferPdfFile = new FinishedOfferPdfService(offer.Id, loggedUser.Id).Print();
                            if (finishedOfferPdfFile != null)
                            {
                                int? finishedOfferPdfFileId = new FileRepository().Save(finishedOfferPdfFile, FileType.OfferPdf);
                                if (finishedOfferPdfFileId.HasValue)
                                {
                                    offer.OfferPdfFileId = finishedOfferPdfFileId;
                                }
                                else
                                {
                                    result = false;
                                }
                            }
                            else
                            {
                                result = false;
                            }
                        }

                        if (result)
                        {
                            offerRepository.Update(offer);
                            if (offer.Status == (byte)OfferStatus.Ordered)
                            {
                                int? createFromOfferResult = CreateOrderFromOffer(offer, loggedUser);
                                if (!createFromOfferResult.HasValue)
                                {
                                    result = false;
                                }
                            }

                        }
                    }

                    if (result)
                    {
                        tran.Complete();
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        [HttpPost]
        public bool SetOfferPaymentType([FromBody]SetOfferPaymentTypeParametersDto model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferRepository offerRepository = new OfferRepository();

                Offer offer = offerRepository.GetById(model.OfferId);
                offer.PaymentType = model.PaymentType.ToByte();
                offerRepository.Update(offer);

                SetValuesOnOffer(offer.Id);

                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        private int? CreateOrderFromOffer(Offer offer, User loggedUser)
        {
            try
            {
                int? result = null;
                OrderRepository orderRepository = new OrderRepository();
                OrderElementRepository orderElementRepository = new OrderElementRepository();
                Order order = new Order()
                {
                    OrderNumber = orderRepository.GetNextOrderNumber(offer.SellerFirmaId),
                    OrderFromOfferId = offer.Id,
                    CatalogValue = 0,
                    ValueAfterPrimatyDiscount = 0,
                    FinalValueAfterAllDiscounts = 0,
                    City = offer.City,
                    CustomerOfferCompanyId = offer.CustomerOfferCompanyId,
                    InstallationObjectObiektyId = offer.InstallationObjectObiektyId,
                    IsDeleted = false,
                    LogoFileId = offer.LogoFileId,
                    OrderDate = DateTime.Now,
                    SellerFirmaId = offer.SellerFirmaId,
                    Status = 0,
                    CreatedByUserId = loggedUser.Id,
                    ModifiedByUserId = loggedUser.Id,
                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now,
                    OwnerUserId = offer.OwnerUserId,
                    IsPrepayment = offer.IsPrepayment,
                    DeliveryTimeDays = offer.DeliveryTimeDays,
                    GuaranteeYears = offer.GuaranteeYears,
                    PaymentType = offer.PaymentType,
                    PrepaymentPercent = offer.PrepaymentPercent,
                    HasOnlyInnoSavaProducts = offer.HasOnlyInnoSavaProducts,
                    DeliveryCost = offer.DeliveryCost,
                    DeliveryType = offer.DeliveryType
                };

                orderRepository.Add(order);
                result = order.Id;

                if (result.HasValue)
                {
                    bool createOrderElementsResult = CreateOrderElementsfromOfferElements(offer.Id, order.Id, loggedUser);
                    if (createOrderElementsResult == false)
                        result = null;
                }
                if (result.HasValue)
                {
                    IEnumerable<OrderElement> orderElements = orderElementRepository.GetByOrderId(order.Id);
                    if (orderElements.Any())
                    {
                        order.CatalogValue = orderElements.Sum(o => o.CatalogPriceNet * o.Quantity);
                        order.ValueAfterPrimatyDiscount = orderElements.Sum(o => o.FinalValueNet);
                        if (order.IsPrepayment == true)
                        {
                            order.FinalValueAfterAllDiscounts = order.ValueAfterPrimatyDiscount - (order.CatalogValue * (decimal)0.02);
                        }
                        else
                        {
                            order.FinalValueAfterAllDiscounts = order.ValueAfterPrimatyDiscount;
                        }
                        orderRepository.Update(order);
                    }
                    else
                        result = null;
                }

                if (result.HasValue)
                {
                    var orderPdfFile = new OrderPdfService(order.Id, loggedUser.Id).Print();
                    if (orderPdfFile != null)
                    {
                        int? orderPdfFileId = new FileRepository().Save(orderPdfFile, FileType.OrderPdf);
                        if (orderPdfFileId.HasValue)
                        {
                            order.PdfFileId = orderPdfFileId;
                            orderRepository.Update(order);
                        }
                        else
                            result = null;
                    }
                    else
                        result = null;
                }

                if (result.HasValue)
                {
                    OrderMailMessageService orderMailMessageService = new OrderMailMessageService(order.Id);
                    orderMailMessageService.Send();
                }

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }

        }

        private bool CreateOrderElementsfromOfferElements(int offerId, int orderId, User loggedUser)
        {
            try
            {
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                OrderElementRepository orderElementRepository = new OrderElementRepository();
                IEnumerable<OfferElement> offerElements = offerElementRepository.GetByOfferId(offerId).Where(o => o.ProduktId.HasValue);

                foreach (OfferElement oe in offerElements)
                {
                    OrderElement orderElement = new OrderElement()
                    {
                        CatalogPriceNet = oe.CatalogPriceNet,
                        Discount = oe.Discount,
                        FinalValueNet = oe.FinalValueNet,
                        IsDeleted = false,
                        OrderId = orderId,
                        PriceAfterDiscountNet = oe.PriceAfterDiscountNet,
                        ProduktId = oe.ProduktId,
                        Quantity = oe.Quantity,
                        CreatedByUserId = loggedUser.Id,
                        CreatedOn = DateTime.Now,
                        ModifiedByUserId = loggedUser.Id,
                        ModifiedOn = DateTime.Now,
                        OwnerUserId = oe.OwnerUserId,
                        CreatedFromOfferElementId = oe.Id,
                        DeliveryTimeDays = oe.DeliveryTimeDays
                    };
                    orderElementRepository.Add(orderElement);
                }
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        private bool SetValuesOnOffer(int offerId)
        {
            try
            {
                OfferRepository offerRepository = new OfferRepository();
                OfferElementRepository offerElementRepository = new OfferElementRepository();
                var offerElements = offerElementRepository.GetByOfferId(offerId);
                var sumCatalogValue = offerElements.Sum(o => o.CatalogPriceNet * o.Quantity);
                var sumValueAfterPrimatyDiscount = offerElements.Sum(o => o.FinalValueNet);

                bool hasOnlyInnoSavaProducts = offerElements.Any() && !offerElements.Where(x => x.PersonalProductId.HasValue).Any();
                if (hasOnlyInnoSavaProducts)
                {
                    var offerElementsGrid = new OfferElementRepository().GridGetOfferElements(new OfferDetailsListGridParametersDto()
                    {
                        OfferId = offerId
                    }, LoggedUserId).Data as List<pCRM_OfferElements_GridGetOfferElementsList_Result>;
                    var groupRepository = new GroupRepository();
                    foreach (var grupaId in offerElementsGrid.Where(x => x.GrupaId.HasValue).Select(x => x.GrupaId).Distinct())
                    {
                        var mainGroup = groupRepository.GetMainGroup(grupaId.Value);
                        hasOnlyInnoSavaProducts &= mainGroup.Code.ToLower().Contains("przepustnice");
                        if (!hasOnlyInnoSavaProducts)
                        {
                            break;
                        }
                    }
                }

                Offer offer = offerRepository.GetById(offerId);
                offer.ValueAfterPrimatyDiscount = sumValueAfterPrimatyDiscount + offer.DeliveryCost;
                offer.CatalogValue = sumCatalogValue + offer.DeliveryCost;
                if ((OfferPaymentType)offer.PaymentType == OfferPaymentType.BeforeDelivery)
                {
                    offer.FinalValueAfterAllDiscounts = sumValueAfterPrimatyDiscount - (decimal)0.02 * sumCatalogValue + offer.DeliveryCost;
                }
                else
                {
                    offer.FinalValueAfterAllDiscounts = sumValueAfterPrimatyDiscount + offer.DeliveryCost;
                }
                offer.HasOnlyInnoSavaProducts = hasOnlyInnoSavaProducts;
                offerRepository.Update(offer);

                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        [HttpPost]
        public bool DeleteOffer([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                OfferRepository offerRepository = new OfferRepository();
                Offer offer = offerRepository.GetById(id);
                offer.ModifiedOn = DateTime.Now;
                offer.ModifiedByUserId = loggedUser.Id;
                offer.IsDeleted = true;
                offerRepository.Update(offer);

                //OfferElementRepository offerElementRepository = new OfferElementRepository();
                //List<OfferElement> offerElements = offerElementRepository.GetByOfferId(id);

                //foreach (OfferElement offerElement in offerElements)
                //{
                //    offerElement.IsDeleted = true;
                //    offerElement.ModifiedByUserId = loggedUser.Id;
                //    offerElement.ModifiedOn = DateTime.Now;
                //    offerElementRepository.Update(offerElement);
                //}

                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        [HttpPost]
        public int? SaveOffer([FromBody]OffersViewModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                OfferRepository offerRepository = new OfferRepository();
                Offer offer = model.OfferId.HasValue ? offerRepository.GetById(model.OfferId.Value) : new Offer();
                if (offer.Id > 0)
                {
                    #region OfferCompany
                    if (!model.OfferCompanyId.HasValue && !string.IsNullOrEmpty(model.OfferCompanyName))
                    {
                        OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                        OfferCompany offerCompany = new OfferCompany();

                        offerCompany.City = model.OfferCompanyCity;
                        offerCompany.Address = model.OfferCompanyAddress;
                        offerCompany.Name = model.OfferCompanyName;
                        offerCompany.NIP = model.OfferCompanyNIP;
                        offerCompany.PostalCode = model.OfferCompanyPostalCode;
                        offerCompany.ModifiedOn = DateTime.Now;
                        offerCompany.ModifiedByUserId = loggedUser.Id;
                        offerCompany.CreatedByUserId = loggedUser.Id;
                        offerCompany.CreatedOn = DateTime.Now;
                        offerCompany.OwnerUserId = loggedUser.Id;
                        offerCompanyRepository.Add(offerCompany);
                        model.OfferCompanyId = offerCompany.Id;
                    }
                    #endregion

                    #region InstallationObject
                    if (!model.InstallationObjectId.HasValue && !string.IsNullOrEmpty(model.InstallationObjectName))
                    {
                        if (model.OfferCompanyId.HasValue)
                        {
                            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
                            InstallationObject installationObject = new InstallationObject();

                            installationObject.Address = model.InstallationObjectAddress;
                            installationObject.City = model.InstallationObjectCity;
                            installationObject.Country = model.InstallationObjectCountry;
                            installationObject.Name = model.InstallationObjectName;
                            installationObject.PostalCode = model.InstallationObjectPostalCode;
                            installationObject.Type = model.InstallationObjectType;
                            installationObject.Status = (int)InstallationObjectStatus.Existing;
                            installationObject.OfferCompanyId = model.OfferCompanyId;
                            installationObjectRepository.Add(installationObject);
                            model.InstallationObjectId = installationObject.Id;
                        }
                    }
                    #endregion

                    offer.OfferDate = model.OfferDate;
                    offer.City = model.City;
                    offer.CustomerOfferCompanyId = model.OfferCompanyId;
                    offer.InstallationObjectObiektyId = model.InstallationObjectId;
                    offer.ModifiedOn = DateTime.Now;
                    offer.ModifiedByUserId = loggedUser.Id;
                    offer.PrepaymentPercent = model.PrepaymentPercent;
                    offer.PaymentType = model.PaymentType.ToByte();
                    offer.DeliveryTimeDays = model.DeliveryTimeDays;
                    offer.WithEmptyInstallationObjectObiektyId = model.WithEmptyInstallationObjectObiektyId;
                    offer.DeliveryType = model.DeliveryType.ToByte();
                    offer.DeliveryCost = model.DeliveryCost;

                    offerRepository.Update(offer);
                    SetValuesOnOffer(offer.Id);
                }
                else
                {
                    offer.Status = OfferStatus.Draft.ToByte();
                    offer.OfferNumber = offerRepository.GetNextOfferNumber(loggedUser.CustomerId);
                    offer.CreatedByUserId = loggedUser.Id;
                    offer.SellerFirmaId = loggedUser.CustomerId;
                    offer.CreatedOn = DateTime.Now;
                    offer.OwnerUserId = loggedUser.Id;
                    offer.ModifiedOn = DateTime.Now;
                    offer.ModifiedByUserId = loggedUser.Id;
                    offer.OfferDate = DateTime.Now;
                    offer.LogoFileId = loggedUser.OfferLogoFileId;
                    offer.GuaranteeYears = 2;
                    offer.DeliveryTimeDays = 25;
                    offer.PaymentType = OfferPaymentType.MoneyTransfer14Days.ToByte();
                    offer.PrepaymentPercent = 30;
                    offer.DeliveryType = OfferDeliveryType.NoDelivery.ToByte();

                    offerRepository.Add(offer);
                }
                return offer.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        #region Logo
        [HttpPost]
        [Authorize]
        public SaveOfferLogoResultDto SaveOfferLogo(int offerId)
        {
            try
            {
                SaveOfferLogoResultDto result = new SaveOfferLogoResultDto();
                var request = HttpContext.Current.Request;
                if (request.Files.Count == 1)
                {
                    User loggedUser = GetLoggedUser();
                    OfferRepository offerRepository = new OfferRepository();
                    var offer = offerRepository.GetById(offerId);
                    if (User.IsInRole(UserRoleType.Admin.ToString()) || loggedUser.CustomerId == offer.SellerFirmaId)
                    {
                        result.FileId = new FileRepository().Save(request.Files[0], FileType.OfferLogo);
                        if (result.FileId.HasValue)
                        {
                            offer.LogoFileId = result.FileId;
                            offerRepository.Update(offer);
                            UserRepository userRepository = new UserRepository();
                            User user = userRepository.GetById(loggedUser.Id);
                            user.OfferLogoFileId = result.FileId;
                            userRepository.Update(user);

                            result.GeneratedFileName = new FileRepository().GetById(result.FileId.Value).GeneratedFileName;
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpDelete]
        public bool DeleteOfferLogo(int offerId)
        {
            try
            {
                bool result = false;
                User loggedUser = GetLoggedUser();
                OfferRepository offerRepository = new OfferRepository();
                var offer = offerRepository.GetById(offerId);
                if (offer.LogoFileId.HasValue
                    && (User.IsInRole(UserRoleType.Admin.ToString()) || loggedUser.CustomerId == offer.SellerFirmaId))
                {
                    offer.LogoFileId = null;
                    offerRepository.Update(offer);
                    result = true;
                }

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }
        #endregion
    }
}