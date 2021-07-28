using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class ConfigurationRepository : BaseRepository<Configuration>
    {
        public Configuration GetConfiguration()
        {
            Configuration result = Ctx.CRM_Configuration.SingleOrDefault();
            return result;
        }
    }
}
