using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum OfferStatus
    {
        [Description("W przygotowaniu")]
        Draft = 0,
        [Description("Zakończona")]
        Finished = 1,
        [Description("Zamówiona")]
        Ordered = 2
    }
}
