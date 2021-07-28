//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using Synergia.B2B.Repository.Services.Mail;
//using Synergia.B2B.Web.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Text;
//using System.Web.Http;

//namespace Synergia.B2B.Web.Api
//{
//    [Authorize(Roles = "Admin, ManagerSection, PlansAndReports")]
//    public class ApiMonthlyReportsController : ApiBaseController
//    {
//        [HttpPost]
//        public int? SetMonthlyReportStatusSubmitted([FromBody]MonthlyReportsViewModel model)
//        {
//            return SaveMonthlyReport(model, true);
//        }

//        [HttpGet]
//        public GridResultDto GridGetMonthlyReports([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                GridResultDto result = monthlyReportRepository.GridGetMonthlyReports(model, user.Id, false);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpGet]
//        public GridResultDto GridGetAllMonthlyReports([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                GridResultDto result = monthlyReportRepository.GridGetMonthlyReports(model, user.Id, true);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpPost]
//        public int? DeleteMonthlyReport([FromBody]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                MonthlyReport monthlyReport = monthlyReportRepository.GetById(id);
//                monthlyReport.IsDeleted = true;
//                monthlyReport.ModifiedOn = DateTime.Now;
//                monthlyReport.ModifiedByUserId = loggedUser.Id;
//                monthlyReportRepository.Update(monthlyReport);
//                return monthlyReport.Id;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpPost]
//        public int? SaveMonthlyReport([FromBody]MonthlyReportsViewModel model, bool isStatusSubmitted = false)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                MonthlyReport existingMonthlyReport = monthlyReportRepository.GetByDateAndUser(DateTime.Parse(model.Date), loggedUser.Id);
//                if (existingMonthlyReport != null && existingMonthlyReport.Id != model.Id)
//                    return -1;

//                MonthlyReport monthlyReport = model.Id.HasValue ? monthlyReportRepository.GetById(model.Id.Value) : new MonthlyReport();
//                monthlyReport.Date = DateTime.Parse(model.Date);
//                monthlyReport.Holidays = model.Holidays;
//                monthlyReport.Summary = model.Summary;
//                monthlyReport.MarketingActivities = model.MarketingActivities;
//                monthlyReport.MarketingPlans = model.MarketingPlans;
//                monthlyReport.NewContacts = model.NewContacts;
//                monthlyReport.Troubles = model.Troubles;
//                monthlyReport.PlannedOrdersValueSum = model.PlannedOrdersValueSum;
//                monthlyReport.OrdersValueSum = model.OrdersValueSum;
//                monthlyReport.PlannedOrdersThreeMonthsValueSum = model.PlannedOrdersThreeMonthsValueSum;
//                monthlyReport.IsDeleted = false;
//                monthlyReport.WorkerId = model.WorkerId;
//                monthlyReport.RegionId = model.RegionId.Value;
//                monthlyReport.Status = isStatusSubmitted == false ? model.Status : (byte)MonthlyReportStatus.Submitted;
//                monthlyReport.Agreements = model.Agreements;
//                monthlyReport.AnsulOffers = model.AnsulOffers;
//                monthlyReport.CentralOffers = model.CentralOffers;
//                monthlyReport.CentralTechnicalSelections = model.CentralTechnicalSelections;
//                monthlyReport.HoodOffers = model.HoodOffers;
//                monthlyReport.HoodTechnicalSelections = model.HoodTechnicalSelections;
//                monthlyReport.KesOffers = model.KesOffers;
//                monthlyReport.MarenoOffers = model.MarenoOffers;
//                monthlyReport.SmokiOffers = model.SmokiOffers;
//                monthlyReport.SmokiTechnicalSelections = model.SmokiTechnicalSelections;
//                monthlyReport.VentilatorOffers = model.VentilatorOffers;
//                monthlyReport.MeetingsQuantity = model.MeetingsQuantity;
//                monthlyReport.MeetingsKitchenTechnologist = model.MeetingsKitchenTechnologist;
//                monthlyReport.MeetingsArchitect = model.MeetingsArchitect;
//                monthlyReport.MeetingsConsultingCompany = model.MeetingsConsultingCompany;
//                monthlyReport.MeetingsGastronomyCompany = model.MeetingsGastronomyCompany;
//                monthlyReport.MeetingsGeneralContractor = model.MeetingsGeneralContractor;
//                monthlyReport.MeetingsInstallationContractor = model.MeetingsInstallationContractor;
//                monthlyReport.MeetingsSynergiaDealer = model.MeetingsSynergiaDealer;
//                monthlyReport.MeetingsMarenoDealer = model.MeetingsMarenoDealer;
//                monthlyReport.MeetingsNetworkInvestor = model.MeetingsNetworkInvestor;
//                monthlyReport.MeetingsSingleInvestor = model.MeetingsSingleInvestor;
//                monthlyReport.MeetingsSanepid = model.MeetingsSanepid;
//                monthlyReport.MeetingsVentilationDesigner = model.MeetingsVentilationDesigner;
//                monthlyReport.MeetingsVentilationWholesaler = model.MeetingsVentilationWholesaler;
//                monthlyReport.MeetingsKitchentChef = model.MeetingsKitchentChef;
//                monthlyReport.MeetingsSupervisionInspector = model.MeetingsSupervisionInspector;
//                monthlyReport.OffersSum = model.OffersSum;
//                monthlyReport.TechnicalSelectionsSum = model.TechnicalSelectionsSum;
//                monthlyReport.ModifiedOn = DateTime.Now;
//                monthlyReport.ModifiedByUserId = loggedUser.Id;
//                //if (monthlyReport.CreatedByUserId == 0)
//                //{
//                //    monthlyReport.CreatedByUserId = loggedUser.Id;
//                //    monthlyReport.OwnerUserId = loggedUser.Id;
//                //    monthlyReport.CreatedOn = DateTime.Now;
//                //}
//                if (monthlyReport.Id == 0)
//                {
//                    monthlyReport.CreatedByUserId = loggedUser.Id;
//                    monthlyReport.OwnerUserId = loggedUser.Id;
//                    monthlyReport.CreatedOn = DateTime.Now;
//                    monthlyReportRepository.Add(monthlyReport);
//                }
//                else
//                {
//                    monthlyReportRepository.Update(monthlyReport);
//                }

//                if (isStatusSubmitted)
//                {
//                    var mailMessageService = new SubmittedMonthlyReportMailMessageService(monthlyReport.Id);
//                    mailMessageService.Send();
//                }

//                return monthlyReport.Id;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public MonthlyReportsViewModel GetMonthlyReport([FromUri]int id)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                MonthlyReport monthlyReport = monthlyReportRepository.GetById(id);

//                UserRepository userRepository = new UserRepository();
//                User worker = userRepository.GetById(monthlyReport.WorkerId);
//                Region region = null;
//                string provinces = null;
//                if (worker.RegionId.HasValue)
//                {
//                    RegionRepository regionRepository = new RegionRepository();
//                    region = regionRepository.GetById(worker.RegionId.Value);
//                    if (region != null)
//                    {
//                        provinces = GetProvinces(worker.RegionId.Value);
//                    }
//                }

//                MonthlyReportsViewModel monthlyReportsViewModel = new MonthlyReportsViewModel()
//                {
//                    Boss = worker.Boss,
//                    Date = monthlyReport.Date.ToString(DateTimeHelper.UniversalDateFormat),
//                    Holidays = monthlyReport.Holidays,
//                    MarketingActivities = monthlyReport.MarketingActivities,
//                    MarketingPlans = monthlyReport.MarketingPlans,
//                    NewContacts = monthlyReport.NewContacts,
//                    OrdersValueSum = monthlyReport.OrdersValueSum,
//                    PlannedOrdersValueSum = monthlyReport.PlannedOrdersValueSum,
//                    Summary = monthlyReport.Summary,
//                    Troubles = monthlyReport.Troubles,
//                    Status = monthlyReport.Status,
//                    WorkerId = worker.Id,
//                    WorkerName = worker.FirstName + " " + worker.Surname,
//                    RegionId = worker.RegionId,
//                    RegionName = region != null ? region.Name : "",
//                    RegionCode = region != null ? region.Code : "",
//                    Id = monthlyReport.Id,
//                    //ProvincesList = provincesList,
//                    Provinces = provinces,
//                    MeetingsQuantity = monthlyReport.MeetingsQuantity,
//                    Agreements = monthlyReport.Agreements,
//                    AnsulOffers = monthlyReport.AnsulOffers,
//                    CentralOffers = monthlyReport.CentralOffers,
//                    CentralTechnicalSelections = monthlyReport.CentralTechnicalSelections,
//                    HoodOffers = monthlyReport.HoodOffers,
//                    HoodTechnicalSelections = monthlyReport.HoodTechnicalSelections,
//                    KesOffers = monthlyReport.KesOffers,
//                    MarenoOffers = monthlyReport.MarenoOffers,
//                    SmokiOffers = monthlyReport.SmokiOffers,
//                    SmokiTechnicalSelections = monthlyReport.SmokiTechnicalSelections,
//                    VentilatorOffers = monthlyReport.VentilatorOffers,
//                    MeetingsArchitect = monthlyReport.MeetingsArchitect,
//                    MeetingsConsultingCompany = monthlyReport.MeetingsConsultingCompany,
//                    MeetingsGastronomyCompany = monthlyReport.MeetingsGastronomyCompany,
//                    MeetingsGeneralContractor = monthlyReport.MeetingsGeneralContractor,
//                    MeetingsInstallationContractor = monthlyReport.MeetingsInstallationContractor,
//                    MeetingsSynergiaDealer = monthlyReport.MeetingsSynergiaDealer,
//                    MeetingsKitchentChef = monthlyReport.MeetingsKitchentChef,
//                    MeetingsKitchenTechnologist = monthlyReport.MeetingsKitchenTechnologist,
//                    MeetingsMarenoDealer = monthlyReport.MeetingsMarenoDealer,
//                    MeetingsNetworkInvestor = monthlyReport.MeetingsNetworkInvestor,
//                    MeetingsSanepid = monthlyReport.MeetingsSanepid,
//                    MeetingsSingleInvestor = monthlyReport.MeetingsSingleInvestor,
//                    MeetingsSupervisionInspector = monthlyReport.MeetingsSupervisionInspector,
//                    MeetingsVentilationDesigner = monthlyReport.MeetingsVentilationDesigner,
//                    MeetingsVentilationWholesaler = monthlyReport.MeetingsVentilationWholesaler,
//                    OffersSum = monthlyReport.OffersSum,
//                    TechnicalSelectionsSum = monthlyReport.TechnicalSelectionsSum,
//                    PlannedOrdersThreeMonthsValueSum = monthlyReport.PlannedOrdersThreeMonthsValueSum,
//                };

//                return monthlyReportsViewModel;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpGet]
//        public MonthlyReportsViewModel NewMonthlyReport()
//        {
//            try
//            {
//                User worker = GetLoggedUser();

//                Region region = null;
//                string provinces = null;
//                if (worker.RegionId.HasValue)
//                {
//                    RegionRepository regionRepository = new RegionRepository();
//                    region = regionRepository.GetById(worker.RegionId.Value);
//                    if (region != null)
//                    {
//                        provinces = GetProvinces(worker.RegionId.Value);
//                    }
//                }

//                MonthlyReportsViewModel monthlyReportsViewModel = new MonthlyReportsViewModel()
//                {
//                    Boss = worker.Boss,
//                    WorkerId = worker.Id,
//                    WorkerName = worker.FirstName + " " + worker.Surname,
//                    RegionId = worker.RegionId,
//                    RegionName = region != null ? region.Name : "",
//                    RegionCode = region != null ? region.Code : "",
//                    Provinces = provinces,
//                    Date = DateTime.Today.AddMonths(-1).ToString(DateTimeHelper.UniversalDateFormat),
//                };

//                return monthlyReportsViewModel;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        private static string GetProvinces(int regionId)
//        {
//            ProvinceRepository provinceRepository = new ProvinceRepository();
//            IEnumerable<Province> provincesList = provinceRepository.GetByRegion(regionId);
//            StringBuilder sb = new StringBuilder();
//            foreach (Province province in provincesList)
//            {
//                sb.Append(province.Name + ", ");
//            }
//            sb.Remove(sb.Length - 2, 2);
//            return sb.ToString();
//        }
//    }
//}
