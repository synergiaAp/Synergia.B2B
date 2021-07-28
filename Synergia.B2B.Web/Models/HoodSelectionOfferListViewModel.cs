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
    public class HoodSelectionOfferListViewModel
    {
        public List<SelectListItem> Statuses { get; set; } = new List<SelectListItem>();

        public HoodSelectionOfferListViewModel()
        {
            List<HoodOfferStatus> statuses = EnumHelper.EnumToListOrdered<HoodOfferStatus>();
            statuses.Remove(HoodOfferStatus.New);

            foreach (var statusItem in statuses)
            {
                Statuses.Add(new SelectListItem()
                {
                    Text = statusItem.GetDescription(),
                    Value = statusItem.GetValue()
                });
            }
        }
    }
}