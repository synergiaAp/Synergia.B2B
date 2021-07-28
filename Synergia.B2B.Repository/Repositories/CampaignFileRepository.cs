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
    public class CampaignFileRepository : BaseRepository<CampaignFile>
    {
        public IEnumerable<CampaignFile> GetByCampaignId(int campaignId)
        {
            try
            {
                var campaignFiles = Ctx.CRM_CampaignFiles.Where(cf => !cf.IsDeleted && cf.CampaignId == campaignId).ToList();
                return campaignFiles;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public GridResultDto GridGetCampaignFiles(CampaignFilesGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var contacts = Ctx.pCRM_CampaignFiles_GridGetCampaignFilesList(model.CampaignId, model.SearchValue,
                        model.OrderColumnNo, model.OrderDirection,
                        model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = contacts,
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
    }
}
