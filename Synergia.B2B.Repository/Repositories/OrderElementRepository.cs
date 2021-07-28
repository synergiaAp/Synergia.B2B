using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class OrderElementRepository : BaseRepository<OrderElement>
    {
        public GridResultDto GridGetOrderElements(OrderDetailsListGridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var orderElements = Ctx.pCRM_OrderElements_GridGetOrderElementsList(userId, model.OrderId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = orderElements,
                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
                };
                return gridResultDto;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public OrderElement GetByOrderIdAndProductId(int orderId, int? productId)
        {
            try
            {
                var orderElement = Ctx.CRM_OrderElements.Where(o => o.OrderId == orderId
                    && o.ProduktId == productId
                    && o.IsDeleted == false)
                .SingleOrDefault();
                return orderElement;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public List<OrderElement> GetByOrderId(int orderId)
        {
            try
            {
                var orderElements = Ctx.CRM_OrderElements.Where(o => o.OrderId == orderId && o.IsDeleted == false).ToList();
                return orderElements;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }
    }
}
