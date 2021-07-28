//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
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
//    public class ApiWeeklyPlansController : ApiBaseController
//    {
//        [HttpPost]
//        public int? SetWeeklyPlanStatusSubmitted([FromBody]WeeklyPlansViewModel model)
//        {
//            return SaveWeeklyPlan(model, true);
//        }

//        [HttpGet]
//        public GridResultDto GridGetWeeklyPlans([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                WeeklyPlanRepository weeklyPlanRepository = new WeeklyPlanRepository();
//                GridResultDto result = weeklyPlanRepository.GridGetWeeklyPlans(model, user.Id, false);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpGet]
//        [Authorize(Roles = "Admin, ManagerSection")]
//        public GridResultDto GridGetAllWeeklyPlans([FromUri]GridParametersDto model)
//        {
//            try
//            {
//                User user = GetLoggedUser();
//                WeeklyPlanRepository weeklyPlanRepository = new WeeklyPlanRepository();
//                GridResultDto result = weeklyPlanRepository.GridGetWeeklyPlans(model, user.Id, true);

//                return result;
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpPost]
//        public int? DeleteWeeklyPlan([FromBody]int id)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();
//                WeeklyPlanRepository weeklyPlanRepository = new WeeklyPlanRepository();
//                WeeklyPlan weeklyPlan = weeklyPlanRepository.GetById(id);
//                weeklyPlan.IsDeleted = true;
//                weeklyPlan.ModifiedOn = DateTime.Now;
//                weeklyPlan.ModifiedByUserId = loggedUser.Id;
//                weeklyPlanRepository.Update(weeklyPlan);
//                return weeklyPlan.Id;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpPost]
//        public int? SaveWeeklyPlan([FromBody]WeeklyPlansViewModel model, bool isStatusSubmitted = false)
//        {
//            try
//            {
//                User loggedUser = GetLoggedUser();

//                WeeklyPlanRepository weeklyPlanRepository = new WeeklyPlanRepository();
//                WeeklyPlan weeklyPlan = model.Id.HasValue ? weeklyPlanRepository.GetById(model.Id.Value) : new WeeklyPlan();
//                weeklyPlan.Monday = model.Monday;
//                weeklyPlan.Tuesday = model.Tuesday;
//                weeklyPlan.Wednesday = model.Wednesday;
//                weeklyPlan.Thursday = model.Thursday;
//                weeklyPlan.Friday = model.Friday;
//                weeklyPlan.Saturday = model.Saturday;
//                weeklyPlan.Sunday = model.Sunday;
//                weeklyPlan.IsDeleted = false;
//                weeklyPlan.WorkerId = model.WorkerId;
//                weeklyPlan.RegionId = model.RegionId.Value;
//                weeklyPlan.Date = DateTime.Now;
//                weeklyPlan.Status = isStatusSubmitted == false ? model.Status : (byte)WeeklyPlanStatus.Submitted;
//                weeklyPlan.ModifiedOn = DateTime.Now;
//                weeklyPlan.ModifiedByUserId = loggedUser.Id;
//                weeklyPlan.WeekValue = byte.Parse(model.WeekValue.Substring(5));
//                weeklyPlan.YearValue = short.Parse(model.WeekValue.Substring(0, 4));
//                //if (weeklyPlan.CreatedByUserId == 0)
//                //{
//                //    weeklyPlan.CreatedByUserId = loggedUser.Id;
//                //    weeklyPlan.OwnerUserId = loggedUser.Id;
//                //    weeklyPlan.CreatedOn = DateTime.Now;
//                //}
//                if (weeklyPlan.Id == 0)
//                {
//                    weeklyPlan.CreatedByUserId = loggedUser.Id;
//                    weeklyPlan.OwnerUserId = loggedUser.Id;
//                    weeklyPlan.CreatedOn = DateTime.Now;
//                    weeklyPlanRepository.Add(weeklyPlan);
//                }
//                else
//                {
//                    weeklyPlanRepository.Update(weeklyPlan);
//                }

//                return weeklyPlan.Id;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        [HttpGet]
//        public WeeklyPlansViewModel GetWeeklyPlan([FromUri]int id)
//        {
//            try
//            {
//                WeeklyPlanRepository weeklyPlanRepository = new WeeklyPlanRepository();
//                WeeklyPlan weeklyPlan = weeklyPlanRepository.GetById(id);

//                UserRepository userRepository = new UserRepository();
//                User worker = userRepository.GetById(weeklyPlan.WorkerId);
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

//                WeeklyPlansViewModel weeklyPlansViewModel = new WeeklyPlansViewModel()
//                {
//                    Boss = worker.Boss,
//                    CreatedOn = weeklyPlan.CreatedOn,
//                    Monday = weeklyPlan.Monday,
//                    Tuesday = weeklyPlan.Tuesday,
//                    Wednesday = weeklyPlan.Wednesday,
//                    Thursday = weeklyPlan.Thursday,
//                    Friday = weeklyPlan.Friday,
//                    Saturday = weeklyPlan.Saturday,
//                    Sunday = weeklyPlan.Sunday,
//                    Status = weeklyPlan.Status,
//                    WorkerId = worker.Id,
//                    WorkerName = worker.FirstName + " " + worker.Surname,
//                    RegionId = worker.RegionId,
//                    RegionName = region != null ? region.Name : "",
//                    RegionCode = region != null ? region.Code : "",
//                    Id = weeklyPlan.Id,
//                    //ProvincesList = provincesList,
//                    Provinces = provinces,
//                    WeekValue = weeklyPlan.WeekValue.HasValue ? $"{weeklyPlan.YearValue}-{weeklyPlan.WeekValue}" : null,
//                    WeekValueDate = weeklyPlan.WeekValue.HasValue ? DateTimeHelper.FirstDateOfWeekISO8601(weeklyPlan.YearValue.Value, weeklyPlan.WeekValue.Value) : (DateTime?)null
//                };

//                return weeklyPlansViewModel;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }

//        }

//        [HttpGet]
//        public WeeklyPlansViewModel NewWeeklyPlan()
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

//                WeeklyPlansViewModel weeklyPlansViewModel = new WeeklyPlansViewModel()
//                {
//                    Boss = worker.Boss,
//                    WorkerId = worker.Id,
//                    WorkerName = worker.FirstName + " " + worker.Surname,
//                    RegionId = worker.RegionId,
//                    RegionName = region != null ? region.Name : "",
//                    RegionCode = region != null ? region.Code : "",
//                    Provinces = provinces,
//                    CreatedOn = DateTime.Today
//                };

//                return weeklyPlansViewModel;
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
