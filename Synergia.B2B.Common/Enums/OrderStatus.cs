using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Enums
{
    public enum OrderStatus
    {
        [Description("Wysłane")]
        Sent = 0
        //[Description("W realizacji")]
        //InProgress = 1,
        //[Description("Zakończone")]
        //Finished = 2
    }
}
