﻿using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, PlansAndReports")]
    public class MonthlyReportsController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View("MonthlyReportsList", new MonthlyReportsViewModel());
        }
    }
}