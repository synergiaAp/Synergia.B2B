//using Synergia.B2B.Common.Dto.Api.Charts;
//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Dto.DB;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class MonthlyReportRepository : BaseRepository<MonthlyReport>
//    {
//        public GridResultDto GridGetMonthlyReports(GridParametersDto model, int userId, bool showAllSubmittedReports)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var monthlyReports = Ctx.pCRM_MonthlyReport_GridGetMonthlyReportsList(userId, showAllSubmittedReports, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = monthlyReports,
//                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
//                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
//                };
//                return gridResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        //public GridResultDto GridGetAllMonthlyReports(GridParametersDto model, int userId, bool showAllSubmittedReports)
//        //{
//        //    try
//        //    {
//        //        GridResultDto gridResultDto = null;
//        //        ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//        //        var monthlyReports = Ctx.pCRM_MonthlyReport_GridGetAllMonthlyReportsList(model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//        //            .ToList();

//        //        gridResultDto = new GridResultDto(model)
//        //        {
//        //            Data = monthlyReports,
//        //            RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
//        //            RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
//        //        };
//        //        return gridResultDto;
//        //    }
//        //    catch (Exception ex)
//        //    {

//        //        Log.Error(ex);
//        //        return null;
//        //    }
//        //}

//        public GridResultDto GridGetActivityAnalysis(ActivitiesAnalysisGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var dataFromSP = Ctx.pCRM_ActivitiesAnalysis_GridGetActivitiesAnalysisList(userId,
//                        model.StartDate, model.EndDate, model.SearchValue, model.OrderColumnNo, model.OrderDirection,
//                        model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = dataFromSP,
//                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
//                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
//                };
//                return gridResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }

//        }

//        public GridResultDto GridGetDetailedAnalysis(DetailedAnalysisGridParametersDto model)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var dataFromSP = Ctx.pCRM_DetailedAnalysis_GridGetDetailedAnalysisList(model.UserId, model.Column.ToByte(),
//                        model.StartDate, model.EndDate, model.SearchValue, model.OrderColumnNo, model.OrderDirection,
//                        model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                foreach (var item in dataFromSP)
//                {
//                    item.ColumnValue = item.ColumnValue.ReplaceNewLineToHtml();
//                }

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = dataFromSP,
//                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
//                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
//                };
//                return gridResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public MonthlyReport GetByDateAndUser(DateTime date, int userId)
//        {
//            try
//            {
//                var result = Ctx.CRM_MonthlyReports.Where(m => m.Date == date && m.WorkerId == userId && m.IsDeleted == false).FirstOrDefault();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }

//        public List<MonthlyReport> GetByOwner(int userId)
//        {
//            try
//            {
//                List<MonthlyReport> result = null;
//                result = Ctx.CRM_MonthlyReports.Where(o => o.OwnerUserId == userId && o.IsDeleted == false).OrderByDescending(o => o.CreatedOn).ToList();

//                return result;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public ChartResultDto ChartGetMeetingsQuantity(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, MeetingsQuantity = m.Sum(z => z.MeetingsQuantity) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.MeetingsQuantity ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public ChartResultDto ChartGetTechnicalSelectionsQuantity(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, TechnicalSelections = m.Sum(z => z.TechnicalSelectionsSum) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.TechnicalSelections ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }

//        }

//        public ChartResultDto ChartGetAgreementsQuantity(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, AgreementsQuantity = m.Sum(z => z.Agreements) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.AgreementsQuantity ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }

//        }

//        public ChartResultDto ChartGetOffersQuantity(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, OffersQuantity = m.Sum(z => z.OffersSum) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.OffersQuantity ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public ChartResultDto ChartGetPlannedOrdersValueChartValues(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, PlannedOrdersValue = m.Sum(z => z.PlannedOrdersValueSum) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.PlannedOrdersValue ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public ChartResultDto ChartGetOrdersValueChartValues(ChartGetParametersDto model)
//        {
//            try
//            {
//                ChartResultDto chartResultDto = new ChartResultDto();

//                var queryResult = Ctx.CRM_MonthlyReports.Where(m => m.Date >= model.StartDate && m.Date <= model.EndDate && m.Status == (byte)MonthlyReportStatus.Submitted)
//                    .GroupBy(m => new { m.OwnerUserId, m.CRM_Users2.FirstName, m.CRM_Users2.Surname })
//                    .Select(m => new { FullName = m.Key.FirstName + " " + m.Key.Surname, OrdersValue = m.Sum(z => z.OrdersValueSum) })
//                    .OrderBy(m => m.FullName);


//                chartResultDto.Labels = queryResult.Select(l => l.FullName).ToList();
//                chartResultDto.Data = queryResult.Select(d => (double)(d.OrdersValue ?? 0)).ToList();

//                return chartResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public List<GetUsersWithReportItemDto> GetUsersWithReport()
//        {
//            try
//            {
//                List<GetUsersWithReportItemDto> result = Ctx.CRM_MonthlyReports
//                .Where(mr => !mr.IsDeleted && mr.Status == (byte)MonthlyReportStatus.Submitted)
//                .Select(mr => new GetUsersWithReportItemDto
//                {
//                    UserId = mr.WorkerId,
//                    FullName = mr.CRM_Users.Surname + " " + mr.CRM_Users.FirstName
//                })
//                .Distinct()
//                .OrderBy(mr => mr.FullName)
//                .ToList();

//                return result;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }
//    }
//}
