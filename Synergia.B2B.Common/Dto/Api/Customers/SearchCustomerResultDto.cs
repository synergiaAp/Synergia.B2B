using Synergia.B2B.Common.Dto.Api.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Customers
{
    public class SearchCustomerResultDto : AutocompleteResultDto
    {
        public int CustomerId { get; set; }
    }
}
