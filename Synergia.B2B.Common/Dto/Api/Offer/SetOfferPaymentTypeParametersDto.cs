using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Offer
{
    public class SetOfferPaymentTypeParametersDto
    {
        public int OfferId { get; set; }
        public OfferPaymentType PaymentType { get; set; }
    }
}
