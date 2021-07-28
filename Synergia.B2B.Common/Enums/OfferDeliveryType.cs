using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum OfferDeliveryType
    {
        [Description("Brak")]
        NoDelivery = 1,

        [Description("Z dostawą")]
        WithDelivery = 2
    }
}
