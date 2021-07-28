using Synergia.B2B.Common.Dto.Api.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Products
{
    public class SearchProductsForOfferResultDto : AutocompleteResultDto
    {
        public int? ProductId { get; set; }
        public int? PersonalProductId { get; set; }
    }
}
