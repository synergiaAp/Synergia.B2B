using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.HoodOffer
{
    public class GetHoodOfferElementAirCalculationDevicesResultDto
    {
        public int HoodOfferElementId { get; set; }
        public List<HoodOfferElementAirCalculationDeviceDto> Elements { get; set; }
    }

    public class HoodOfferElementAirCalculationDeviceDto
    {
        public int Id { get; set; }
        public int? HoodOfferAirCalculationDeviceId { get; set; }
        public byte OrderNo { get; set; }
        public string CustomOrderNo { get; set; }
        public string AdditionalName { get; set; }
        public decimal? Power { get; set; }
        public decimal? SValue { get; set; }
        public int? MpValue { get; set; }
    }
}
