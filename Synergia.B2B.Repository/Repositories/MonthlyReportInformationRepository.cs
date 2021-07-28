//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class MonthlyReportInformationRepository : BaseRepository<MonthlyReportInformation>
//    {
//        public IQueryable<MonthlyReportInformation> GetByMonthlyReportId(int monthlyReportId)
//        {
//            try
//            {
//                IQueryable<MonthlyReportInformation> result = null;
//                result = Ctx.CRM_MonthlyReportInformations.Where(o => o.MonthlyReportId == monthlyReportId && o.IsDeleted == false).OrderBy(o => o.CreatedOn);

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
