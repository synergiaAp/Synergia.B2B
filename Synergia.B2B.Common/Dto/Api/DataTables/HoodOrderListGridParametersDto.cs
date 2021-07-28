using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.DataTables
{
    public class HoodOrderListGridParametersDto : GridParametersDto
    {
        public HoodFinalOfferElementType? Type { get; set; }
    }
}
