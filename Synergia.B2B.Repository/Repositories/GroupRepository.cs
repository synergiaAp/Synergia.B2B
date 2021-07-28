using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class GroupRepository : BaseRepository<Group>
    {
        public List<Group> GetByParId(int parId)
        {
            try
            {
                return Ctx.vCRM_Grupy.Where(g => g.ParId == parId)
                    .OrderBy(g => g.Code)
                    .ToList();
            }
            catch(Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public Group GetMainGroup(int groupId)
        {

            try
            {
                var group = Ctx.vCRM_Grupy.Where(x=>x.Id == groupId).Single();
                while(group.ParId != SynergiaHelper.GroupMainParId)
                {
                    group = Ctx.vCRM_Grupy.Where(x=>x.Id == group.ParId).Single();
                }
                return group;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}
