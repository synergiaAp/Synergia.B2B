//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Dto.Api.HoodOffer;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using Synergia.B2B.Repository.Services.Pdf;
//using Synergia.B2B.Web.Models;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Text.RegularExpressions;
//using System.Transactions;
//using System.Web.Http;

//namespace Synergia.B2B.Web.Api
//{
//    [Authorize(Roles = "Admin, HoodSelection, HoodOffersAndOrders")]
//    public class ApiHoodOffersController : ApiBaseController
//    {
//        [HttpGet]
//        public HttpResponseMessage GridGetHoodOffers([FromUri]HoodOfferListGridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                HoodOfferRepository offerRepository = new HoodOfferRepository();
//                GridResultDto result = offerRepository.GridGetOffers(model, user.Id);

//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult CreateHoodFinalOfferFromHoodOffer([FromBody]int hoodOfferId)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                using (TransactionScope tran = new TransactionScope())
//                {

//                    HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                    HoodOffer hoodOffer = hoodOfferRepository.GetById(hoodOfferId);

//                    InstallationObject installationObject = null;
//                    if (hoodOffer.InstallationObjectObiektyId.HasValue)
//                    {
//                        InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
//                        installationObject = installationObjectRepository.GetById(hoodOffer.InstallationObjectObiektyId.Value);
//                    }

//                    HoodFinalOfferRepository hoodFinalOfferRepository = new HoodFinalOfferRepository();
//                    string nextFinaOfferNumber = hoodFinalOfferRepository.GetNextHoodFinalOfferNumber(hoodOfferId);
//                    HoodFinalOffer hoodFinalOffer = MappingHelper.Mapper.Map<HoodFinalOffer>(hoodOffer);

//                    hoodFinalOffer.Id = 0;
//                    hoodFinalOffer.City = installationObject?.City;
//                    hoodFinalOffer.CopiedFromHoodFinalOfferId = null;
//                    hoodFinalOffer.CreatedByUserId = loggedUser.Id;
//                    hoodFinalOffer.ModifiedByUserId = loggedUser.Id;
//                    hoodFinalOffer.OwnerUserId = loggedUser.Id;
//                    hoodFinalOffer.CreatedOn = DateTime.Now;
//                    hoodFinalOffer.ModifiedOn = DateTime.Now;
//                    hoodFinalOffer.SellerFirmaId = loggedUser.CustomerId;
//                    hoodFinalOffer.DeliveryTime = "4-6 tygodni";
//                    hoodFinalOffer.GuaranteeYearsAnsul = 5;
//                    hoodFinalOffer.GuaranteeYearsCookAir = 2;
//                    hoodFinalOffer.GuaranteeYearsHoods = 2;
//                    hoodFinalOffer.GuaranteeYearsKES = 2;
//                    hoodFinalOffer.GuaranteeYearsSmoki = 2;
//                    hoodFinalOffer.GuaranteeYearsVentilators = 2;
//                    hoodFinalOffer.HoodOffersId = hoodOffer.Id;
//                    hoodFinalOffer.IsActive = true;
//                    hoodFinalOffer.OfferDate = DateTime.Now;
//                    hoodFinalOffer.OfferNumber = nextFinaOfferNumber;
//                    hoodFinalOffer.PaymentType = (byte)OfferPaymentType.BeforeDelivery;
//                    hoodFinalOffer.PrepaymentPercent = 30;

//                    var configuration = new ConfigurationRepository().GetConfiguration();
//                    hoodFinalOffer.LogoFileId = configuration.HoodFinalOfferLogoFileId;

//                    if (installationObject != null && installationObject.OfferCompanyId.HasValue)
//                    {
//                        hoodFinalOffer.CustomerOfferCompanyId = installationObject.OfferCompanyId.Value;
//                    }
//                    hoodFinalOffer.Status = (byte)OfferStatus.Draft;
//                    hoodFinalOfferRepository.Add(hoodFinalOffer);

//                    HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                    List<HoodOfferElement> hoodOfferElements = hoodOfferElementRepository.GetByHoodOfferId(hoodOffer.Id)
//                        .OrderBy(a => a.OrderNo)
//                        .ToList();
//                    HoodFinalOfferElementRepository hoodFinalOfferElementRepository = new HoodFinalOfferElementRepository();

//                    if (hoodOfferElements.Where(x => !x.FinalPriceSingleElement.HasValue).Any())
//                    {
//                        return BadRequest("Cena okapu jest równa zero, sprawdź ponownie poprawność wprowadzonych danych");
//                    }

//                    foreach (HoodOfferElement hoe in hoodOfferElements)
//                    {
//                        decimal priceFactor = 3.5M;
//                        HoodFinalOfferElement hfoe = new HoodFinalOfferElement();
//                        hfoe.CreatedOn = DateTime.Now;
//                        hfoe.ModifiedOn = DateTime.Now;
//                        hfoe.CreatedByUserId = loggedUser.Id;
//                        hfoe.ModifiedByUserId = loggedUser.Id;
//                        hfoe.OwnerUserId = loggedUser.Id;
//                        hfoe.CatalogPriceNet = Math.Ceiling(hoe.FinalPriceSingleElement.Value * priceFactor / 100) * 100;
//                        hfoe.Quantity = hoe.Quantity;
//                        hfoe.FinalValueNet = hfoe.CatalogPriceNet * hfoe.Quantity;
//                        hfoe.HoodFinalOffersId = hoodFinalOffer.Id;
//                        hfoe.PriceAfterDiscountNet = hfoe.CatalogPriceNet - (hfoe.CatalogPriceNet * hfoe.Discount);
//                        hfoe.Type = HoodFinalOfferElementType.Hood.ToByte();
//                        hfoe.HoodOfferElementsId = hoe.Id;
//                        hfoe.PurchasePriceNet = hoe.FinalPriceSingleElement.Value;
//                        hfoe.PriceFactor = priceFactor;
//                        hfoe.ProductName = SynergiaHelper.GetHoodFinalOfferProductName((HoodFinalOfferElementType)hfoe.Type, hoe.HoodNr);
//                        hoodFinalOfferElementRepository.Add(hfoe);
//                    }

//                    HoodOfferAccessoryRepository hoodOfferAccessoryRepository = new HoodOfferAccessoryRepository();
//                    List<HoodOfferAccessory> hoodOfferAccessories = hoodOfferAccessoryRepository.GetByHoodOfferId(hoodOffer.Id);

//                    foreach (HoodOfferAccessory hoa in hoodOfferAccessories)
//                    {
//                        decimal priceFactor = hoa.Type == (byte)HoodOfferAccessoryType.Ansul
//                            ? 2.5M
//                            : 1;
//                        HoodFinalOfferElement hfoe = new HoodFinalOfferElement();
//                        hfoe.CreatedOn = DateTime.Now;
//                        hfoe.ModifiedOn = DateTime.Now;
//                        hfoe.CreatedByUserId = loggedUser.Id;
//                        hfoe.ModifiedByUserId = loggedUser.Id;
//                        hfoe.OwnerUserId = loggedUser.Id;
//                        hfoe.Quantity = hoa.Quantity;
//                        hfoe.CatalogPriceNet = hoa.Type != HoodOfferAccessoryType.Ventilator.ToByte()
//                            ? Math.Ceiling(hoa.Price * priceFactor / 100) * 100
//                            : hoa.Price * priceFactor;
//                        hfoe.FinalValueNet = hfoe.CatalogPriceNet * hfoe.Quantity;
//                        hfoe.HoodFinalOffersId = hoodFinalOffer.Id;
//                        hfoe.PriceAfterDiscountNet = hfoe.CatalogPriceNet - (hfoe.CatalogPriceNet * hfoe.Discount);
//                        hfoe.Type = hoa.Type + 1;
//                        hfoe.HoodOfferAccessoryId = hoa.Id;
//                        hfoe.PurchasePriceNet = hoa.Price;
//                        hfoe.PriceFactor = priceFactor;
//                        hfoe.ProductName = SynergiaHelper.GetHoodFinalOfferProductName((HoodFinalOfferElementType)hfoe.Type, null);
//                        hoodFinalOfferElementRepository.Add(hfoe);
//                    }

//                    hoodFinalOffer = hoodFinalOfferRepository.GetById(hoodFinalOffer.Id);
//                    hoodFinalOffer.CatalogValue = hoodFinalOfferElementRepository.GetByHoodFinalOfferId(hoodFinalOffer.Id).Select(x => x.CatalogPriceNet * (decimal)x.Quantity).Sum();
//                    hoodFinalOffer.ValueAfterPrimatyDiscount = hoodFinalOfferElementRepository.GetByHoodFinalOfferId(hoodFinalOffer.Id).Select(x => x.PriceAfterDiscountNet * (decimal)x.Quantity).Sum();
//                    hoodFinalOffer.FinalValueAfterAllDiscounts = hoodFinalOfferElementRepository.GetByHoodFinalOfferId(hoodFinalOffer.Id).Select(x => x.FinalValueNet).Sum();
//                    hoodFinalOfferRepository.Update(hoodFinalOffer);

//                    hoodOffer.Status = (byte)HoodOfferStatus.Offered;
//                    hoodOffer.ModifiedOn = DateTime.Now;
//                    hoodOffer.ModifiedByUserId = loggedUser.Id;
//                    hoodOfferRepository.Update(hoodOffer);

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

//        [HttpPost]
//        public bool SetHoodOfferStatus([FromBody] SetHoodOfferStatusParametersDto model)
//        {
//            try
//            {
//                bool result = false;
//                User loggedUser = GetLoggedUser();


//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                HoodOffer hoodOffer = hoodOfferRepository.GetById(model.HoodOfferId);

//                if (hoodOffer != null && hoodOffer.Status < model.Status.ToByte())
//                {
//                    result = true;
//                    hoodOffer.Status = (byte)HoodOfferStatus.Finished;
//                    hoodOffer.ModifiedOn = DateTime.Now;
//                    hoodOffer.ModifiedByUserId = loggedUser.Id;
//                    hoodOfferRepository.Update(hoodOffer);
//                }

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return false;
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage DeleteHoodOffer([FromBody]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                HoodOffer hoodOffer = hoodOfferRepository.GetById(id);
//                hoodOffer.ModifiedOn = DateTime.Now;
//                hoodOffer.ModifiedByUserId = loggedUser.Id;
//                hoodOffer.IsDeleted = true;
//                hoodOfferRepository.Update(hoodOffer);

//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                List<HoodOfferElement> hoodOfferElements = hoodOfferElementRepository.GetByHoodOfferId(id);
//                if (hoodOfferElements.Any())
//                {
//                    foreach (HoodOfferElement hoe in hoodOfferElements)
//                    {
//                        hoe.ModifiedOn = DateTime.Now;
//                        hoe.ModifiedByUserId = loggedUser.Id;
//                        hoe.IsDeleted = true;
//                        hoodOfferElementRepository.Update(hoe);
//                    }
//                }

//                HoodOfferHelper.RemoveHoodOfferCatalog(id);

//                return Request.CreateResponse(HttpStatusCode.OK, true);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public IHttpActionResult SaveHoodOffer([FromBody]HoodSelectionOfferDetailsFormViewModel model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                using (var tran = hoodOfferRepository.CreateTransaction())
//                {
//                    HoodOffer hoodOffer = model.HoodOfferId.HasValue ? hoodOfferRepository.GetById(model.HoodOfferId.Value) : new HoodOffer();
//                    DateTime now = DateTime.Now;
//                    if (hoodOffer.Id > 0)
//                    {
//                        string prevHoodOfferFilePath = HoodOfferHelper.GetFileDirectoryPath(hoodOffer.Id);
//                        string prevPdfFileName = HoodOfferHelper.GetPdfFileName(hoodOffer.Id);

//                        #region InstallationObject
//                        if (!model.HoodInstallationObjectId.HasValue && !string.IsNullOrEmpty(model.HoodInstallationObjectName))
//                        {
//                            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
//                            InstallationObject installationObject = new InstallationObject();

//                            installationObject.Address = model.HoodInstallationObjectAddress;
//                            installationObject.City = model.HoodInstallationObjectCity;
//                            installationObject.Country = model.HoodInstallationObjectCountry;
//                            installationObject.Name = model.HoodInstallationObjectName;
//                            installationObject.PostalCode = model.HoodInstallationObjectPostalCode;
//                            installationObject.Type = model.HoodInstallationObjectType;
//                            installationObject.Status = (int)InstallationObjectStatus.Existing;
//                            installationObjectRepository.Add(installationObject);
//                            model.HoodInstallationObjectId = installationObject.Id;
//                        }
//                        #endregion

//                        if ((HoodOfferStatus)hoodOffer.Status == HoodOfferStatus.Draft && !string.IsNullOrEmpty(model.HoodOfferNumber)
//                            && hoodOffer.OfferNumber != model.HoodOfferNumber)
//                        {
//                            var existingOfferNumber = hoodOfferRepository.GetByOfferNumber(model.HoodOfferNumber);
//                            if (existingOfferNumber == null)
//                            {
//                                hoodOffer.IsManualOfferNumber = true;
//                                hoodOffer.OfferNumber = model.HoodOfferNumber;
//                            }
//                            else
//                            {
//                                return BadRequest("Oferta o podanym numerze już istnieje");
//                            }
//                        }

//                        hoodOffer.InstallationObjectObiektyId = model.HoodInstallationObjectId;
//                        hoodOffer.ModifiedOn = DateTime.Now;
//                        hoodOffer.ModifiedByUserId = loggedUser.Id;
//                        hoodOffer.ContactPerson = model.HoodOfferContactPerson;
//                        hoodOffer.ContactEmail = model.HoodOfferContactEmail;
//                        hoodOffer.ContactPhone = model.HoodOfferContactPhone;
//                        hoodOffer.RegionId = model.HoodOfferRegionId;
//                        hoodOffer.Comment = model.Comment;
//                        hoodOffer.LanguageId = model.LanguageId;
//                        if ((HoodOfferStatus)hoodOffer.Status == HoodOfferStatus.New)
//                        {
//                            hoodOffer.Status = HoodOfferStatus.Draft.ToByte();
//                            var nextOfferNumberIndex = hoodOfferRepository.GetNextOfferNumberIndex();
//                            hoodOffer.OfferNumber = $"JE{DateTime.Today.ToString("yy")}-{nextOfferNumberIndex}_1";
//                            hoodOffer.OfferNumberIndex = nextOfferNumberIndex;
//                        }
//                        hoodOfferRepository.Update(hoodOffer);

//                        string currentHoodOfferFilePath = HoodOfferHelper.GetFileDirectoryPath(hoodOffer.Id);

//                        if (prevHoodOfferFilePath != currentHoodOfferFilePath || !Directory.Exists(currentHoodOfferFilePath))
//                        {
//                            HoodOfferHelper.RemoveHoodOfferCatalog(prevHoodOfferFilePath, prevPdfFileName, currentHoodOfferFilePath);

//                            if (!string.IsNullOrEmpty(currentHoodOfferFilePath) && !Directory.Exists(currentHoodOfferFilePath))
//                            {
//                                Directory.CreateDirectory(currentHoodOfferFilePath);
//                            }
//                        }

//                        if (!string.IsNullOrEmpty(currentHoodOfferFilePath))
//                        {
//                            HoodOfferPdfService hoodOfferPdfService = new HoodOfferPdfService(hoodOffer.Id);
//                            var result = hoodOfferPdfService.Print();
//                        }
//                        //SetValuesOnOffer(hoodOffer.Id);
//                    }
//                    else
//                    {
//                        hoodOffer.Status = HoodOfferStatus.New.ToByte();
//                        hoodOffer.OfferNumber = ""; //hoodOfferRepository.GetNextOfferNumber();
//                        hoodOffer.CreatedByUserId = loggedUser.Id;
//                        hoodOffer.CreatedOn = now;
//                        hoodOffer.OwnerUserId = loggedUser.Id;
//                        hoodOffer.ModifiedOn = now;
//                        hoodOffer.ModifiedByUserId = loggedUser.Id;
//                        hoodOffer.LanguageId = 1; /*Polski*/

//                        hoodOfferRepository.Add(hoodOffer);
//                    }
//                    tran.Complete();
//                    return Ok(hoodOffer.Id);
//                }
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return InternalServerError();
//            }
//        }

//        [HttpGet]
//        public HttpResponseMessage GetHoodOfferData([FromUri]int hoodOfferId)
//        {
//            try
//            {
//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                HoodOffer hoodOffer = hoodOfferRepository.GetById(hoodOfferId);
//                RegionRepository regionRepository = new RegionRepository();

//                HoodSelectionOfferDetailsFormViewModel result = new HoodSelectionOfferDetailsFormViewModel()
//                {
//                    HoodOfferId = hoodOffer.Id,
//                    HoodOfferNumber = hoodOffer.OfferNumber,
//                    HoodStatus = hoodOffer.Status,
//                    HoodStatusText = ((HoodOfferStatus)hoodOffer.Status).GetDescription(),
//                    HoodInstallationObjectId = hoodOffer.InstallationObjectObiektyId,
//                    HoodOfferContactEmail = hoodOffer.ContactEmail,
//                    HoodOfferContactPerson = hoodOffer.ContactPerson,
//                    HoodOfferContactPhone = hoodOffer.ContactPhone,
//                    HoodOfferRegionId = hoodOffer.RegionId,
//                    Comment = hoodOffer.Comment,
//                    LanguageId = hoodOffer.LanguageId
//                };
//                return Request.CreateResponse(HttpStatusCode.OK, result);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }

//        [HttpPost]
//        public HttpResponseMessage CopyHoodOffer([FromBody]int hoodOfferId)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                DateTime now = DateTime.Now;
//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                HoodOffer newHoodOffer = null;
//                using (var tran = hoodOfferRepository.CreateTransaction())
//                {
//                    HoodOffer hoodOffer = hoodOfferRepository.GetById(hoodOfferId);
//                    newHoodOffer = new HoodOffer()
//                    {
//                        CreatedByUserId = loggedUser.Id,
//                        CreatedOn = now,
//                        InstallationObjectObiektyId = hoodOffer.InstallationObjectObiektyId,
//                        IsDeleted = false,
//                        ModifiedByUserId = loggedUser.Id,
//                        ModifiedOn = now,
//                        OfferNumber = hoodOfferRepository.GetNextOfferNumberFromCopy(hoodOffer.OfferNumber),
//                        OwnerUserId = hoodOffer.OwnerUserId,
//                        Status = HoodOfferStatus.Draft.ToByte(),
//                        CopiedFromHoodOfferId = hoodOfferId,
//                        FinalValue = hoodOffer.FinalValue,
//                        ContactEmail = hoodOffer.ContactEmail,
//                        ContactPerson = hoodOffer.ContactPerson,
//                        ContactPhone = hoodOffer.ContactPhone,
//                        RegionId = hoodOffer.RegionId,
//                        OfferNumberIndex = hoodOffer.OfferNumberIndex,
//                        IsManualOfferNumber = hoodOffer.IsManualOfferNumber,
//                        LanguageId = hoodOffer.LanguageId
//                    };
//                    hoodOfferRepository.Add(newHoodOffer);
//                    if (hoodOffer.Status == (byte)HoodOfferStatus.Draft)
//                    {
//                        hoodOffer.Status = (byte)HoodOfferStatus.Finished;
//                        hoodOffer.ModifiedOn = DateTime.Now;
//                        hoodOffer.ModifiedByUserId = loggedUser.Id;
//                        hoodOfferRepository.Update(hoodOffer);
//                    }

//                    HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                    HoodOfferElementAirCalculationDeviceRepository hoodOfferElementAirCalculationDeviceRepository = new HoodOfferElementAirCalculationDeviceRepository();

//                    var hoofOfferAccessoryRepository = new HoodOfferAccessoryRepository();
//                    var hoodOfferAccessories = hoofOfferAccessoryRepository.GetByHoodOfferId(hoodOffer.Id);

//                    List<HoodOfferElement> hoodOfferElements = hoodOfferElementRepository.GetByHoodOfferId(hoodOffer.Id);

//                    foreach (HoodOfferElement oe in hoodOfferElements)
//                    {
//                        int hoodOfferElementId = oe.Id;
//                        HoodOfferElement newHoodOfferElement = MappingHelper.Mapper.Map<HoodOfferElement>(oe);
//                        newHoodOfferElement.CreatedByUserId = loggedUser.Id;
//                        newHoodOfferElement.CreatedOn = now;
//                        newHoodOfferElement.ModifiedByUserId = loggedUser.Id;
//                        newHoodOfferElement.ModifiedOn = now;
//                        newHoodOfferElement.OwnerUserId = loggedUser.Id;
//                        newHoodOfferElement.HoodOfferId = newHoodOffer.Id;
//                        hoodOfferElementRepository.Add(newHoodOfferElement);

//                        foreach (var hoa in hoodOfferAccessories.Where(x => x.HoodOfferElementId == hoodOfferElementId))
//                        {
//                            var newHoodOfferAccessory = MappingHelper.Mapper.Map<HoodOfferAccessory>(hoa);
//                            newHoodOfferAccessory.CreatedByUserId = loggedUser.Id;
//                            newHoodOfferAccessory.CreatedOn = now;
//                            newHoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                            newHoodOfferAccessory.ModifiedOn = now;
//                            newHoodOfferAccessory.OwnerUserId = loggedUser.Id;
//                            newHoodOfferAccessory.HoodOfferElementId = newHoodOfferElement.Id;
//                            newHoodOfferAccessory.HoodOfferId = newHoodOffer.Id;
//                            hoofOfferAccessoryRepository.Add(newHoodOfferAccessory);
//                        }

//                        List<HoodOfferElementAirCalculationDevice> hoodOfferElementAirCalculationDevices = hoodOfferElementAirCalculationDeviceRepository.GetByHoodOfferElementId(hoodOfferElementId);

//                        foreach (HoodOfferElementAirCalculationDevice oea in hoodOfferElementAirCalculationDevices)
//                        {
//                            HoodOfferElementAirCalculationDevice newHoodOfferElementAirCalculationDevice = MappingHelper.Mapper.Map<HoodOfferElementAirCalculationDevice>(oea);
//                            newHoodOfferElementAirCalculationDevice.CreatedByUserId = loggedUser.Id;
//                            newHoodOfferElementAirCalculationDevice.CreatedOn = now;
//                            newHoodOfferElementAirCalculationDevice.ModifiedByUserId = loggedUser.Id;
//                            newHoodOfferElementAirCalculationDevice.ModifiedOn = now;
//                            newHoodOfferElementAirCalculationDevice.OwnerUserId = loggedUser.Id;
//                            newHoodOfferElementAirCalculationDevice.HoodOfferElementId = newHoodOfferElement.Id;
//                            hoodOfferElementAirCalculationDeviceRepository.Add(newHoodOfferElementAirCalculationDevice);
//                        }
//                    }

//                    foreach (var hoa in hoodOfferAccessories.Where(x => !x.HoodOfferElementId.HasValue))
//                    {
//                        var newHoodOfferAccessory = MappingHelper.Mapper.Map<HoodOfferAccessory>(hoa);
//                        newHoodOfferAccessory.CreatedByUserId = loggedUser.Id;
//                        newHoodOfferAccessory.CreatedOn = now;
//                        newHoodOfferAccessory.ModifiedByUserId = loggedUser.Id;
//                        newHoodOfferAccessory.ModifiedOn = now;
//                        newHoodOfferAccessory.OwnerUserId = loggedUser.Id;
//                        newHoodOfferAccessory.HoodOfferId = newHoodOffer.Id;
//                        hoofOfferAccessoryRepository.Add(newHoodOfferAccessory);
//                    }

//                    Directory.CreateDirectory(HoodOfferHelper.GetFileDirectoryPath(newHoodOffer.Id));

//                    tran.Complete();
//                }

//                return Request.CreateResponse(HttpStatusCode.OK, newHoodOffer.Id);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return Request.CreateResponse(HttpStatusCode.InternalServerError);
//            }
//        }
//    }
//}
