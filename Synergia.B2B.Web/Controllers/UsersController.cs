using Synergia.B2B.Common.Entities;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, AdministrationSection")]
    public class UsersController : Controller
    {
        public ActionResult Index()
        {
            return View("UsersList", new UsersViewModel() {IsActive = true });
        }
    }
}