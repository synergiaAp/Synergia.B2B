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
//using System.Web;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodFinalOfferElementRepository : BaseRepository<HoodFinalOfferElement>
//    {
//        public GridResultDto GridGetHoodFinalOfferElements(HoodFinalOfferDetailsListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var offerElements = Ctx.pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList(userId, model.HoodFinalOfferId, model.SearchValue,
//                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = offerElements,
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

//        public HoodFinalOfferElement GetByHoodFinalOfferElementIdAndProductId(int offerId, int? productId, int? personalProductId)
//        {
//            try
//            {
//                var offerElement = Ctx.CRM_HoodFinalOfferElements.Where(o => o.HoodFinalOffersId == offerId
//                    && o.ProduktId == productId
//                    && o.IsDeleted == false
//                    && o.PersonalProductId == personalProductId)
//                .SingleOrDefault();
//                return offerElement;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }

//        public List<HoodFinalOfferElement> GetByHoodFinalOfferId(int offerId)
//        {
//            try
//            {
//                var offerElements = Ctx.CRM_HoodFinalOfferElements
//                    .Where(o => o.HoodFinalOffersId == offerId && o.IsDeleted == false)
//                    .ToList();
//                return offerElements;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }

//        public List<HoodFinalOfferElement> GetByHoodFinalOfferId(int offerId, HoodFinalOfferElementType hoodFinalOfferElementType)
//        {
//            try
//            {
//                var offerElements = Ctx.CRM_HoodFinalOfferElements
//                    .Where(o => o.HoodFinalOffersId == offerId && o.IsDeleted == false && o.Type == (byte)hoodFinalOfferElementType)
//                    .OrderBy(x => x.Id)
//                    .ToList();
//                return offerElements;
//            }
//            catch (Exception ex)
//            {
//                Log.Error(ex);
//                return null;
//            }
//        }

//        public List<HoodFinalOfferElementType> GetHoodFinalOfferElementTypes(int hoodFinalOfferId)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodFinalOfferElements
//                    .Where(o => o.IsDeleted == false && o.HoodFinalOffersId == hoodFinalOfferId)
//                    .Select(o => (HoodFinalOfferElementType)o.Type)
//                    .Distinct()
//                    .ToList();
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
