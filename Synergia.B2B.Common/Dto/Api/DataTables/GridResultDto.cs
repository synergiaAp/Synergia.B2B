using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.DataTables
{
    public class GridResultDto
    {
        [JsonProperty(PropertyName = "draw")]
        public int Draw { get; set; }
        [JsonProperty(PropertyName = "recordsTotal")]
        public int RecordsTotal { get; set; }
        [JsonProperty(PropertyName = "recordsFiltered")]
        public int RecordsFiltered { get; set; }
        [JsonProperty(PropertyName = "data")]
        public object Data { get; set; }
        //public List<long> AllItemsIds { get; set; }

        public GridResultDto(GridParametersDto parameters)
        {
            Draw = parameters.Draw + 1;
        }
    }
}
