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
//    public class ApiDetailedAnalysisController : ApiBaseController
//    {
//        [HttpGet]
//        public GridResultDto GridGetDetailedAnalysis([FromUri]DetailedAnalysisGridParametersDto model)
//        {
//            try
//            {
//                //MonthlyReportRepository monthlyReportRepository = new MonthlyReportRepository();
//                GridResultDto result = monthlyReportRepository.GridGetDetailedAnalysis(model);

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
