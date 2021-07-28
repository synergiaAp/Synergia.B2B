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
    public class ProductDocumentRepository : BaseRepository<ProductDocumentRepository>
    {
        public GridResultDto GridGetProductDocuments(ProductDocumentsListGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var productDocuments = Ctx.pCRM_Products_GridGetDocumentsList(model.ProductId, model.SearchValue,
                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = productDocuments,
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

        public List<pCRM_Products_GridGetDocumentsList_Result> GetProductDocuments(List<int> productIds)
        {
            try
            {
                var gridResult = GridGetProductDocuments(new ProductDocumentsListGridParametersDto()
                {
                    Draw = 1,
                    Length = int.MaxValue,
                    Order = new GridOrderDto[]{
                    new GridOrderDto()
                    {
                        Column = 1,
                        Dir = "ASC"
                    }
                    },
                    ProductId = string.Join(",", productIds),
                    Start = 0
                });

                return gridResult.Data as List<pCRM_Products_GridGetDocumentsList_Result>;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }

        }
    }
}
