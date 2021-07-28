using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class UserRoleDictRepository : BaseRepository<UserRoleDict>
    {
        public override List<UserRoleDict> GetAll()
        {
            try
            {
                var result = Ctx.CRM_UserRolesDict.Where(x => x.IsDeleted == false)
                    .OrderBy(x => x.Name)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw;
            }
        }
    }
}
