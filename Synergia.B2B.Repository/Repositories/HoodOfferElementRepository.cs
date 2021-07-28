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
//    public class HoodOfferElementRepository : BaseRepository<HoodOfferElement>
//    {
//        public GridResultDto GridGetAllHoodOfferElements(GridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var offers = Ctx.pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList(userId, model.SearchValue,
//                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = offers,
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

//        public GridResultDto GridGetHoodOfferElements(HoodOfferElementsListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var offers = Ctx.pCRM_HoodOfferElements_GridGetHoodOfferElementsList(userId, model.HoodOfferId, model.SearchValue,
//                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = offers,
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

//        public List<HoodOfferElement> GetByHoodOfferId(int hoodOfferId)
//        {
//            try
//            {
//                var hoodOfferElements = Ctx.CRM_HoodOfferElements.Where(o => o.HoodOfferId == hoodOfferId && !o.IsDeleted)
//                    .OrderBy(o => o.Id)
//                    .ToList();
//                return hoodOfferElements;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }

//        public byte GetNextOrderNo(int hoodOfferId)
//        {
//            try
//            {
//                byte maxOrderNo = Ctx.CRM_HoodOfferElements.Where(o => o.HoodOfferId == hoodOfferId && !o.IsDeleted)
//                    .Max(o => o.OrderNo)
//                    .GetValueOrDefault(0);
//                maxOrderNo++;
//                return maxOrderNo;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                throw ex;
//            }
//        }
//    }

//}
