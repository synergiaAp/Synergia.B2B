using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize(Roles = "Admin, Documents")]
    public class DocumentsController : Controller
    {
        // GET: Documents
        public ActionResult GetInvoices()
        {
            return View("InvoicesList", new InvoicesViewModel());
        }

        public ActionResult GetWZDocs()
        {
            return View("WZDocsList", new WZDocsViewModel());
        }
    }
}