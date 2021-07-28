using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, ManagerSection")]
    public class CampaignsController : Controller
    {
        [HttpGet]
        public ActionResult CampaignsList()
        {
            return View(new CampaignsViewModel());
        }
    }
}