using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Synergia.B2B.Repository.Repositories
{
    public class OrderRepository : BaseRepository<Order>
    {
        public GridResultDto GridGetOrders(GridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var Orders = Ctx.pCRM_Orders_GridGetOrdersList(userId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = Orders,
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

        public string GetNextOrderNumber(int customerId)
        {
            try
            {
                Order latestOrder = Ctx.CRM_Orders.Where(o => o.SellerFirmaId == customerId && o.IsDeleted == false).OrderByDescending(o => o.Id).FirstOrDefault();
                string result = 1.ToString("D6");
                if (latestOrder != null)
                {
                    result = (ParseHelper.ToInt(latestOrder.OrderNumber) + 1).ToString("D6");
                }

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public bool? ExistsByOfferCompanyId(int offerCompanyId)
        {
            try
            {
                bool result = Ctx.CRM_Orders.Where(o => !o.IsDeleted && o.CustomerOfferCompanyId == offerCompanyId).Any();
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}
