using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class UserRoleRepository : BaseRepository<UserRole>
    {
        public List<UserRole> GetByUserId(int userId)
        {
            try
            {
                var result = Ctx.CRM_UserRoles.Where(x => x.IsDeleted == false && x.UserId == userId)
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
