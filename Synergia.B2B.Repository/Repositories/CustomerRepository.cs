using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class CustomerRepository : BaseRepository<Customer>
    {
        public GridResultDto GridGetCustomers(CustomersListGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var customers = Ctx.pCRM_Customers_GridGetCustomersList(model.ShowOfferCompanies, model.ShowSymfoniaCompanies, 
                    model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = customers,
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

        public List<Customer> GetByMarker(string marker)
        {
            try
            {
                var result = Ctx.vCRM_Firmy.Where(c => c.Marker == marker).ToList();
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public override Customer GetById(int customerId)
        {
            try
            {
                var result = Ctx.vCRM_Firmy.Where(c => c.id == customerId).SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public List<Customer> Search(string term)
        {
            try
            {
                var result = Ctx.vCRM_Firmy
                    .Where(p => (string.IsNullOrEmpty(term) || p.Name.Contains(term)))
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
