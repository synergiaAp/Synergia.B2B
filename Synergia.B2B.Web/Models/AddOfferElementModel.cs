using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class AddOfferElementModel
    {
        public int? ProductId { get; set; }
        public int OfferId { get; set; }
        public int Quantity { get; set; }
        public int? PersonalProductId { get; set; }
    }
}