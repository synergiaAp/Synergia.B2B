using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum HoodOfferStatus
    {
        [Description("Nowa")]
        New = 0,
        [Description("W przygotowaniu")]
        Draft = 1,
        [Description("Zamknięta")]
        Finished = 2,
        [Description("Zaimportowana")]
        Imported = 3,
        [Description("Zaoferowana")]
        Offered = 4
    }
}
