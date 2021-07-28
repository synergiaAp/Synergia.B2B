using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum DetailedAnalysisFilterColumn
    {
        [Description("Ważne nowe kontakty personalne")]
        NewContacts = 1,
        [Description("Działalność marketingowa")]
        MarketingActivities = 2,
        [Description("Plany marketingowe")]
        MarketingPlans = 3,
        [Description("Serwis, pomiary, regulacje okapów, reklamacje, inne")]
        Troubles = 4,
        [Description("Urlopy")]
        Holidays = 5,
        [Description("Podsumowanie miesiąca")]
        Summary = 6
    }
}
