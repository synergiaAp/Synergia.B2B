using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Offer
{
    public class SetOfferIsPrepaymentParametersDto
    {
        public int OfferId { get; set; }
        public bool IsPrepayment { get; set; }
    }
}
