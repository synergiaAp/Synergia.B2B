using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.DataTables
{
    public class GridParametersDto
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }
        public GridOrderDto[] Order { get; set; }
        public GridColumnDto[] Columns { get; set; }
        public GridSearchDto Search { get; set; }

        public string SearchValue
        {
            get
            {
                return Search != null ? Search.Value : null;
            }
        }

        public string OrderDirection
        {
            get
            {
                return Order != null ? Order[0].Dir : "";
            }
        }

        public byte OrderColumnNo
        {
            get
            {
                return Order != null ? byte.Parse(Order[0].Column.ToString()) : (byte)0;
            }
        }
    }

    public class GridColumnDto
    {
        public string Data { get; set; }
        public string Name { get; set; }
        public bool Searchable { get; set; }
        public bool Orderable { get; set; }
        public GridSearchDto Search { get; set; }
    }

    public class GridOrderDto
    {
        public int Column { get; set; }
        public string Dir { get; set; }
    }

    public class GridSearchDto
    {
        public string Value { get; set; }
        public bool Regex { get; set; }
    }
}
