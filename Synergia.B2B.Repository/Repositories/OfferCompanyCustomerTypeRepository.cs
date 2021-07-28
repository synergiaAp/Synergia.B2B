using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class OfferCompanyCustomerTypeRepository : BaseRepository<OfferCompanyCustomerType>
    {
        public List<OfferCompanyCustomerType> GetByOfferCompanyId(int offerCompanyId)
        {
            try
            {
                var result = Ctx.CRM_OfferCompanyCustomerType.Where(x => !x.IsDeleted && x.OfferCompanyId == offerCompanyId)
                    .ToList();
                return result;
            }
            catch(Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw ex;
            }
        }
    }
}
