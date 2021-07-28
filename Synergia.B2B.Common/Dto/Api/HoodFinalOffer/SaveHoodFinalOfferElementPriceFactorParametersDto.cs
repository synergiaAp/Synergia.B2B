using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.HoodFinalOffer
{
    public class SaveHoodFinalOfferElementPriceFactorParametersDto
    {
        public int HoodFinalOfferElementId { get; set; }
        public decimal PriceFactor { get; set; }
    }
}
