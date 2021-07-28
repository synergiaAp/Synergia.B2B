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
    public class PersonalProductRepository : BaseRepository<PersonalProduct>
    {
        public GridResultDto GridGetPersonalProducts(GridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var personalProducts = Ctx.pCRM_PersonalProducts_GridGetPersonalProductsList(userId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = personalProducts,
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

        public List<PersonalProduct> SearchProductsForOffer(string term, int? userId)
        {
            try
            {
                var result = Ctx.CRM_PersonalProducts
                    .Where(p => (string.IsNullOrEmpty(term) || p.Code.Contains(term) || p.Name.Contains(term))
                        && (!userId.HasValue || p.OwnerUserId == userId))
                    .OrderBy(p => p.Code)
                    .Take(20)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }
    }
}
