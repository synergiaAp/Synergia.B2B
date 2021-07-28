using Synergia.B2B.Common.Dto.Api.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.OfferCompany
{
    public class SearchOfferCompanyResultDto : AutocompleteResultDto
    {
        public int OfferCompanyId { get; set; }
    }
}
