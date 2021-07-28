//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodPartsPriceListRepository:BaseRepository<HoodPartsPriceList>
//    {
//        public GridResultDto GridGetHoodPartPriceList(GridParametersDto model)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var hoodPartsPrices = Ctx.pCRM_HoodPartsPriceList_GridGetHoodPartsPriceListList(model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = hoodPartsPrices,
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

//        public override List<HoodPartsPriceList> GetAll()
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodPartsPriceList.Where(x => !x.IsDeleted).ToList();
//                return result;
//            }
//            catch(Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }
//    }
//}
