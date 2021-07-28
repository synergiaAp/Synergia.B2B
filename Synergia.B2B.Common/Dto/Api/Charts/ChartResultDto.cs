using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Charts
{
    public class ChartResultDto
    {
        public List<string> Labels { get; set; }
        public List<double> Data { get; set; }
    }
}
