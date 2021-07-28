using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class CustomerTypeRepository : BaseRepository<CustomerType>
    {
        public override List<CustomerType> GetAll()
        {
            try
            {
                var result = Ctx.CRM_CustomerType.Where(x => !x.IsDeleted)
                    .OrderBy(x => x.Name)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}
