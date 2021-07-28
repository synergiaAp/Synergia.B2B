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
//    public class HoodOrderElementRepository : BaseRepository<HoodOrderElement>
//    {
//        public GridResultDto GridGetHoodOrderElements(HoodOrderDetailsListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var orderElements = Ctx.pCRM_HoodOrderElements_GridGetHoodOrderElementsList(userId, model.HoodOrderId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = orderElements,
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

//        //public OrderElement GetByOrderIdAndProductId(int orderId, int? productId)
//        //{
//        //    try
//        //    {
//        //        var orderElement = Ctx.CRM_OrderElements.Where(o => o.OrderId == orderId
//        //            && o.ProduktId == productId
//        //            && o.IsDeleted == false)
//        //        .SingleOrDefault();
//        //        return orderElement;
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        Log.Error(ex);
//        //        return null;
//        //    }
//        //}

//        public List<HoodOrderElement> GetByHoodOrderId(int hoodOrderId)
//        {
//            try
//            {
//                var orderElements = Ctx.CRM_HoodOrderElements.Where(o => o.HoodOrderId == hoodOrderId && o.IsDeleted == false).ToList();
//                return orderElements;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }
//    }
//}
