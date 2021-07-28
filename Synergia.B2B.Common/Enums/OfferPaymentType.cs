using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum OfferPaymentType
    {
        [Description("Przed dostawą (Rabat 2%)")]
        BeforeDelivery = 0,
        [Description("Przelew 7 dni")]
        MoneyTransfer7Days = 1,
        [Description("Przelew 14 dni")]
        MoneyTransfer14Days = 2,
        [Description("Przelew 21 dni")]
        MoneyTransfer21Days = 3,
        [Description("Przelew 30 dni")]
        MoneyTransfer30Days = 4,
        [Description("Przelew 60 dni")]
        MoneyTransfer60Days = 5,
        [Description("Przelew 90 dni")]
        MoneyTransfer90Days = 6
    }
}
