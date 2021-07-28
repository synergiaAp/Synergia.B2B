using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class AddHoodFinalOfferElementModel
    {
        public int? ProductId { get; set; }
        public int HoodFinalOfferId { get; set; }
        public int Quantity { get; set; }
        public int? PersonalProductId { get; set; }
    }
}