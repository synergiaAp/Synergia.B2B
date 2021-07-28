using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Products
{
    public class GetProductsResultDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public int? ParentParentId { get; set; }
    }
}
