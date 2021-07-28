//using Synergia.B2B.Common.Dto.Api.Charts;
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
//    [Authorize(Roles = "Admin, ManagerSection")]
//    public class ApiActivitiesAnalysisController : ApiBaseController
//    {
//        [HttpGet]
//        public GridResultDto GridGetActivityAnalysis([FromUri]ActivitiesAnalysisGridParametersDto model)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                GridResultDto result = monthlyReportRepository.GridGetActivityAnalysis(model, loggedUser.Id);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpGet]
//        public ChartResultDto ChartGetMeetingsQuantity([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetMeetingsQuantity(model);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public ChartResultDto ChartGetTechnicalSelectionsQuantity([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetTechnicalSelectionsQuantity(model);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public ChartResultDto ChartGetAgreementsQuantity([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetAgreementsQuantity(model);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public ChartResultDto ChartGetOffersQuantity([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetOffersQuantity(model);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public ChartResultDto ChartGetPlannedOrdersValueChartValues([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetPlannedOrdersValueChartValues(model);

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public ChartResultDto ChartGetOrdersValueChartValues([FromUri]ChartGetParametersDto model)
//        {
//            try
//            {
//                MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                ChartResultDto result = monthlyReportRepository.ChartGetOrdersValueChartValues(model);

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
