using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, Clients")]
    
    public class CustomersController : Controller
    {
        // GET: Customers
        public ActionResult Index()
        {
            return View("CustomersList", new CustomersViewModel());
        }

        //public ActionResult CustomerDetails()
        public ActionResult CustomerDetails(int id = -1)
        {
            int id2 = id;
            //return View("ProductDetails", productsViewModel);
            //return View(customersViewModel); // Wystarczy View bo taka sama jest nazwa widoku, w nawiasie jest podany model
            //return View("CustomerDetails", new CustomersViewModel());
            return View("CustomerDetails", new CustomersViewModel() { Id = id });
        }
    }
}