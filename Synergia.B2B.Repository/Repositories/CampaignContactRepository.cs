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
    public class CampaignContactRepository : BaseRepository<CampaignContact>
    {
        public GridResultDto GridGetCampaignContacts(CampaignContactsGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var contacts = Ctx.pCRM_CampaignContacts_GridGetCampaignContactsList(model.CampaignId, model.SearchValue, 
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

        public GridResultDto GridGetAvailableContacts(AvailableContactsCampaignGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var contacts = Ctx.pCRM_CampaignContacts_GridGetAvailableContactsList(model.CampaignId, model.ContactType, model.SearchValue,
                        model.OrderColumnNo, model.OrderDirection,
                        model.Start, int.MaxValue, recordsTotalOP)
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

        public CampaignContact GetByContactId(int campaignId, int contactId)
        {
            try
            {
                return Ctx.CRM_CampaignContacts.Where(cc => !cc.IsDeleted && cc.CampaignId == campaignId && cc.ContactId == contactId).SingleOrDefault();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public IEnumerable<CampaignContact> GetByCampaignId(int campaignId)
        {
            try
            {
                var campaignContacts = Ctx.CRM_CampaignContacts.Where(cc => !cc.IsDeleted && cc.CampaignId == campaignId).ToList();
                return campaignContacts;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }
    }
}
