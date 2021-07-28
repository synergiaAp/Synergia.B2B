using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class InstallationObjectRepository : BaseRepository<InstallationObject>
    {
        public GridResultDto GridGetInstallationObjects(GridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                //var installationObjects = Ctx.pCRM_Objects_GridGetInstallationObjectsList(model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                //    .ToList();

                //gridResultDto = new GridResultDto(model)
                //{
                //    Data = installationObjects,
                //    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
                //    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
                //};
                return gridResultDto;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }

        }

        public List<InstallationObject> GetByOwner(int userId)
        {
            try
            {
                List<InstallationObject> result = null;
                result = Ctx.S_OBIEKTY.Where(o => o.KhId == userId).OrderBy(o => o.Name).ToList();

                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public override List<InstallationObject> GetAll()
        {
            try
            {
                List<InstallationObject> result = null;
                result = Ctx.S_OBIEKTY.Where(o => o.Status == (int)InstallationObjectStatus.Existing).OrderBy(o => o.Name).ToList();

                return result;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
        }

        public List<InstallationObject> Search(string term, int? offerCompanyId)
        {
            try
            {
                var result = Ctx.S_OBIEKTY
                    .Where(p => (string.IsNullOrEmpty(term) || p.Name.Contains(term)) && (!offerCompanyId.HasValue || p.OfferCompanyId == offerCompanyId))
                    .OrderBy(p => p.Name)
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
