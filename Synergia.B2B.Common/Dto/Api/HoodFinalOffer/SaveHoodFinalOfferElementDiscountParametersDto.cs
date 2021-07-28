using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.HoodFinalOffer
{
    public class SaveHoodFinalOfferElementDiscountParametersDto
    {
        public int HoodFinalOfferId { get; set; }
        public int? HoodFinalOfferElementId { get; set; }
        public decimal Discount { get; set; }
    }
}
