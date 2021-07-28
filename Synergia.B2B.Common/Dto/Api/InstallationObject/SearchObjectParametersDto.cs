using Synergia.B2B.Common.Dto.Api.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.InstallationObject
{
    public class SearchObjectParametersDto : AutocompleteParametersDto
    {
        public int? OfferCompanyId { get; set; }
    }
}
