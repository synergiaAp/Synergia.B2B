//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace Synergia.B2B.Web.Models
//{
//    public class DetailedAnalysisViewModel
//    {
//        public List<SelectListItem> Users { get; set; }
//        public List<SelectListItem> Columns { get; set; }

//        public DetailedAnalysisViewModel()
//        {
//            try
//            {
//                var users = new MonthlyReportRepository().GetUsersWithReport();
//                Users = users.Select(u => new SelectListItem()
//                {
//                    Text = u.FullName,
//                    Value = u.UserId.ToString()
//                }).ToList();

//                Columns = EnumHelper.EnumToListOrdered<DetailedAnalysisFilterColumn>().Select(e => new SelectListItem()
//                {
//                    Text = e.GetDescription(),
//                    Value = e.GetValue()
//                }).ToList();
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }
//    }
//}