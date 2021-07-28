using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Products
{
    public class GetProductsParametersDto
    {
        public string Search { get; set; }
        public long GroupId { get; set; }

    }
}
