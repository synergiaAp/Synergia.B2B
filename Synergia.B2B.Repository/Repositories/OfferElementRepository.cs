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
    public class OfferElementRepository : BaseRepository<OfferElement>
    {
        public GridResultDto GridGetOfferElements(OfferDetailsListGridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var offerElements = Ctx.pCRM_OfferElements_GridGetOfferElementsList(userId, model.OfferId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = offerElements,
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

        public OfferElement GetByOfferIdAndProductId (int offerId, int? productId, int? personalProductId)
        {
            try
            {
                var offerElement = Ctx.CRM_OfferElements.Where(o => o.OffersId == offerId 
                    && o.ProduktId == productId 
                    && o.IsDeleted == false
                    && o.PersonalProductId == personalProductId)
                .SingleOrDefault();
                return offerElement;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public List<OfferElement> GetByOfferId(int offerId)
        {
            try
            {
                var offerElements = Ctx.CRM_OfferElements.Where(o => o.OffersId == offerId && o.IsDeleted == false).ToList();
                return offerElements;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }
    }
}
