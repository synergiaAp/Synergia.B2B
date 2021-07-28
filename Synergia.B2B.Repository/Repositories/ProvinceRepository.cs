using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class ProvinceRepository : BaseRepository<Province>
    {
        public IQueryable<Province> GetByRegion(int regionId)
        {
            try
            {
                var provinces = Ctx.CRM_Provinces.Where(p => p.RegionId == regionId);
                return provinces;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }
    }
}
