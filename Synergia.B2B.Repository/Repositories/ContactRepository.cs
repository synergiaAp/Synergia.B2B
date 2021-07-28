using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Synergia.B2B.Repository.Repositories
{
    public class ContactRepository : BaseRepository<Contact>
    {
        public GridResultDto GridGetContacts(GridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var contacts = Ctx.pCRM_Contacts_GridGetContactsList(userId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
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

        public List<Contact> GetToBirthdayReminder(int userId)
        {
            try
            {
                List<Contact> result = Ctx.CRM_Contacts.AsNoTracking()
                    .Include(c=>c.CRM_OfferCompanies)
                    .Where(c => c.BirthdayReminder && c.BirthDate.HasValue 
                        && c.BirthDate.Value.Day == DateTime.Today.Day && c.BirthDate.Value.Month == DateTime.Today.Month 
                        && c.OwnerUserId == userId)
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
