using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.Campaign
{
    public class AddCampaignContactsParametersDto
    {
        public int CampaignId { get; set; }
        public List<int> ContactIds { get; set; }
    }
}
