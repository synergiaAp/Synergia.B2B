using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.DataTables
{
    public class DetailedAnalysisGridParametersDto : GridParametersDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? UserId { get; set; }
        public DetailedAnalysisFilterColumn Column { get; set; }
    }
}
