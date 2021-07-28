using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, Products")]
    public class ProductsController : Controller
    {
        public ActionResult Index(int? groupId)
        {
            return View("ProductsList", new ProductsViewModel() { GroupId = groupId });
        }

        public ActionResult ProductDetails(int id)
        {
            ProductsViewModel productsViewModel = new ProductsViewModel()
            {
                GroupId = id,
            };

            //return View("ProductDetails", productsViewModel);
            return View(productsViewModel); // Wystarczy View bo taka sama jest nazwa widoku, w nawiasie jest podany model
        }
    }
}