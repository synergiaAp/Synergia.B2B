using Synergia.B2B.Common.Enums;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, HoodSelection, HoodOffersAndOrders")]
    public class HoodSelectionController : Controller
    {
        [HttpGet]
        public ActionResult HoodSelectionOfferList()
        {
            return View(new HoodSelectionOfferListViewModel());
        }

        [HttpGet]
        public ActionResult HoodSelectionFinishedOfferList()
        {
            return View("HoodSelectionFinishedOfferList", new HoodSelectionOfferListViewModel());
        }

        [HttpGet]
        public ActionResult HoodSelectionFinalOfferList()
        {
            return View("HoodFinalOffersList", new HoodFinalOfferListViewModel());
        }

        [HttpGet]
        public ActionResult HoodSelectionHoodOrderList()
        {
            return View("HoodOrdersList", new HoodOrderListFilterViewModel());
        }

        [HttpGet]
        public ActionResult HoodSelectionOfferDetails(int id)
        {
            return View(new HoodSelectionOfferDetailsViewModel() { HoodOfferId = id });
        }

        [HttpGet]
        public ActionResult HoodsList()
        {
            return View("HoodSelectionAllOfferDetailsHoodList", new HoodSelectionOfferDetailsViewModel());
        }

        [HttpGet]
        public ActionResult HoodPartsPriceList()
        {
            return View();
        }
    }
}