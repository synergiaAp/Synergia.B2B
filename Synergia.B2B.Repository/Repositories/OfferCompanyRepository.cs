using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class OfferCompanyRepository : BaseRepository<OfferCompany>
    {
        public List<OfferCompany> GetByOwner(int userId)
        {
            try
            {
                List<OfferCompany> result = null;
                result = Ctx.CRM_OfferCompanies.Where(o => o.OwnerUserId == userId ).OrderBy(o => o.Name).ToList();
                
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public override List<OfferCompany> GetAll()
        {
            try
            {
                List<OfferCompany> result = null;
                result = Ctx.CRM_OfferCompanies.Where(o => o.IsDeleted == false).OrderBy(o => o.Name).ToList();

                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public List<OfferCompany> Search(string term, int? customerId)
        {
            try
            {
                List<OfferCompany> result = null;
                result = Ctx.CRM_OfferCompanies.Where(o => o.IsDeleted == false && (string.IsNullOrEmpty(term) || o.Name.Contains(term))
                        && (!customerId.HasValue || o.CRM_Users.CustomerId == customerId))
                    .OrderBy(o => o.Name)
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
