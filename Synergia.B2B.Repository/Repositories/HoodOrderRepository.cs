//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodOrderRepository : BaseRepository<HoodOrder>
//    {
//        public GridResultDto GridGetHoodOrders(HoodOrderListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var Orders = Ctx.pCRM_HoodOrders_GridGetHoodOrdersList(userId, (byte?)model.Type, model.SearchValue, model.OrderColumnNo, 
//                    model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = Orders,
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

//        public string GetNextOrderNumber(HoodFinalOfferElementType hoodFinalOfferElementType)
//        {
//            try
//            {
//                var latestOrder = Ctx.CRM_HoodOrders.Where(o => o.IsDeleted == false && o.Type == (byte)hoodFinalOfferElementType)
//                    .OrderByDescending(o => o.Id)
//                    .FirstOrDefault();
//                string result = 1.ToString("D4");
//                if (latestOrder != null)
//                {
//                    result = (ParseHelper.ToInt(latestOrder.OrderNumber) + 1).ToString("D4");
//                }

//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        //public bool? ExistsByOfferCompanyId(int offerCompanyId)
//        //{
//        //    try
//        //    {
//        //        bool result = Ctx.CRM_Orders.Where(o => !o.IsDeleted && o.CustomerOfferCompanyId == offerCompanyId).Any();
//        //        return result;
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        LogHelper.Log.Error(ex);
//        //        return null;
//        //    }
//        //}
//    }
//}
