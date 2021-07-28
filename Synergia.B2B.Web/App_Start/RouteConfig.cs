using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Synergia.B2B.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "GetDocumentFileName",
               url: "Files/GetDocument/{fileName}",
               defaults: new { controller = "Files", action = "GetDocument" }
           );

            routes.MapRoute(
               name: "GetCRMFile",
               url: "Files/GetCRMFile/{fileName}/{*friendlyFileName}",
               defaults: new { controller = "Files", action = "GetCRMFile", friendlyFileName = UrlParameter.Optional }
           );

            routes.MapRoute(
               name: "GetKHDocs",
               url: "Files/GetKHDocs/{fileUniqueGuid}/{*fileName}",
               defaults: new { controller = "Files", action = "GetKHDocs" }
           );

            routes.MapRoute(
               name: "GetHoodOfferPdfFile",
               url: "Files/GetHoodOfferPdfFile/{hoodOfferId}/{fileUniqueGuid}/{*fileName}",
               defaults: new { controller = "Files", action = "GetHoodOfferPdfFile" }
           );

            routes.MapRoute(
               name: "GetHoodFinalOfferPdfFile",
               url: "Files/GetHoodFinalOfferPdfFile/{hoodOfferId}/{fileUniqueGuid}/{*fileName}",
               defaults: new { controller = "Files", action = "GetHoodFinalOfferPdfFile" }
           );

            routes.MapRoute(
               name: "GetOfferElementsZipFile",
               url: "Files/GetOfferElementsZipFile/{fileUniqueGuid}/{offerId}",
               defaults: new { controller = "Files", action = "GetOfferElementsZipFile" }
            );



            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
