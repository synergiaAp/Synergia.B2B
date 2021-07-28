using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    public class AddHoodOfferAccessoryModel
    {
        public string Name { get; set; }

        public HoodOfferAccessoryType Type { get; set; }

        public int HoodOfferId { get; set; }
    }
}