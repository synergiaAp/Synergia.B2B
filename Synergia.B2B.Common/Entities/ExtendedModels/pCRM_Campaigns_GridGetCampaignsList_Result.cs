using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Entities
{
    public partial class pCRM_Campaigns_GridGetCampaignsList_Result
    {
        public string StatusText
        {
            get
            {
                return ((CampaignStatus)Status).GetDescription();
            }
        }
    }
}
