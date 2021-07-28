using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class HoodOrderListFilterViewModel
    {
        public List<SelectListItem> OrderTypes { get; set; } = new List<SelectListItem>();

        public HoodOrderListFilterViewModel()
        {
            List<HoodFinalOfferElementType> types = EnumHelper.EnumToListOrdered<HoodFinalOfferElementType>();

            foreach (var type in types)
            {
                OrderTypes.Add(new SelectListItem()
                {
                    Text = SynergiaHelper.GetHoodFinalOfferElementTypeCode(type),
                    Value = type.GetValue()
                });
            }

            OrderTypes = OrderTypes.OrderBy(x => x.Text).ToList();
        }
    }
}