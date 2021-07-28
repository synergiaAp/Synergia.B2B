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
//    public class WeeklyPlanRepository : BaseRepository<WeeklyPlan>
//    {
//        public GridResultDto GridGetWeeklyPlans(GridParametersDto model, int userId, bool showAllWeeklyReports)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var weeklyPlans = Ctx.pCRM_WeeklyPlans_GridGetWeeklyPlansList(userId, showAllWeeklyReports, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = weeklyPlans,
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

//        public WeeklyPlan GetByDateAndUser(DateTime date, int userId)
//        {
//            try
//            {
//                var result = Ctx.CRM_WeeklyPlans.Where(m => m.Date == date && m.WorkerId == userId && m.IsDeleted == false).FirstOrDefault();
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
