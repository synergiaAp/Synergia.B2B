using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.DataTables
{
    public class CustomersListGridParametersDto : GridParametersDto 
    {
        public bool ShowOfferCompanies { get; set; }
        public bool ShowSymfoniaCompanies { get; set; }
    }
}
