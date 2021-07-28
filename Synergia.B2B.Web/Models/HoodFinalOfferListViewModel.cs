using Synergia.B2B.Common.Dto.Web.Offer;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Models
{
    public class HoodFinalOfferListViewModel
    {
        public List<SelectListItem> Statuses { get; set; }

        #region Constructor
        public HoodFinalOfferListViewModel()
        {
            Statuses = new List<SelectListItem>();
            List<OfferStatus> statuses = EnumHelper.EnumToListOrdered<OfferStatus>();
            foreach (var statusItem in statuses)
            {
                Statuses.Add(new SelectListItem()
                {
                    Text = statusItem.GetDescription(),
                    Value = statusItem.GetValue()
                });
            }
        }
        #endregion

    }
}