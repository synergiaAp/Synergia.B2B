using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum CampaignStatus
    {
        [Description("W przygotowaniu")]
        Pending = 1,
        [Description("Wysłane")]
        Sent = 2
    }
}
