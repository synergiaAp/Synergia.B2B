using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.HoodFinalOffer
{
    public class SetHoodFinalOfferStatusParametersDto
    {
        public int HoodFinalOfferId { get; set; }
        public OfferStatus Status { get; set; }
    }
}
