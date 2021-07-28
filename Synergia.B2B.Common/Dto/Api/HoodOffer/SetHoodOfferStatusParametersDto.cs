using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.HoodOffer
{
    public class SetHoodOfferStatusParametersDto
    {
        public int HoodOfferId { get; set; }
        public HoodOfferStatus Status { get; set; }
    }
}
