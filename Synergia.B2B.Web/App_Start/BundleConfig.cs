using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace Synergia.B2B.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Scripts/jquery-3.2.1.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/material.min.js",
                        "~/Scripts/perfect-scrollbar.jquery.min.js",
                        "~/Scripts/arrive.min.js",
                        "~/Scripts/jquery.validate.min.js",
                        "~/Scripts/jquery.validate.unobtrusive.js",
                        "~/Scripts/es6-promise-auto.min.js",
                        "~/Scripts/moment.min.js",
                        "~/Scripts/chartist.min.js",
                        "~/Scripts/jquery.bootstrap-wizard.js",
                        "~/Scripts/bootstrap-notify.js",
                        "~/Scripts/bootstrap-datetimepicker.js",
                        "~/Scripts/jquery-jvectormap.js",
                        "~/Scripts/nouislider.min.js",
                        "~/Scripts/jquery.select-bootstrap.js",
                        "~/Scripts/jquery.datatables.js",
                        "~/Scripts/dataTables.buttons.js",
                        "~/Scripts/jszip.js",
                        "~/Scripts/pdfmake.js",
                        "~/Scripts/vfs_fonts.js",
                        "~/Scripts/buttons.html5.js",
                        "~/Scripts/buttons.bootstrap.js",
                        "~/Scripts/dataTables.rowReorder.js",
                        "~/Scripts/rowReorder.bootstrap.js",
                        "~/Scripts/sweetalert2.js",
                        "~/Scripts/jasny-bootstrap.min.js",
                        "~/Scripts/fullcalendar.min.js",
                        "~/Scripts/jquery.tagsinput.js",
                        "~/Scripts/material-dashboard.js",
                        "~/Scripts/js.cookie-2.2.0.min.js",
                        "~/Scripts/numeral.min.js",
                        "~/Scripts/numeral-locales.min.js",
                        "~/Scripts/demo.js",
                        "~/Scripts/Chart.min.js",
                        "~/Scripts/jquery-ui.js",
                        "~/Scripts/TypeScript/Enums.js",
                        "~/Scripts/TypeScript/Utility.js",
                        "~/Scripts/jasny-bootstrap.js",
                        "~/Scripts/jquery.bootstrap-touchspin.js",
                        "~/Scripts/TypeScript/Shared/LayoutMain.js",
                        "~/Scripts/dropzone.js",
                        "~/Scripts/bootstrap-multiselect/bootstrap-multiselect.js"
                        //"~/Scripts/DataTables/pdfmake.js",
                        //"~/Scripts/DataTables/vfs_font.js"
                        //"~/Scripts/DataTables/jszip.js",
                        //"~/Scripts/DataTables/dataTables.buttons.js",
                        //"~/Scripts/DataTables/buttons.html5.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      //"~/Scripts/datatables/css/jquery.dataTables.css",
                      // "~/Content/awesome-bootstrap-checkbox.css",
                      "~/Content/bootstrap.min.css",
                      "~/Content/material-dashboard.css",
                      "~/Content/font-awesome.css",
                      "~/Content/jasny-bootstrap.css",
                      "~/Content/jquery.bootstrap-touchspin.css",
                      "~/Content/dropzone.css",
                      "~/Content/jquery-ui.css",
                      "~/Content/buttons.bootstrap.css",
                      "~/Content/rowReorder.bootstrap.css",
                      "~/Scripts/bootstrap-multiselect/bootstrap-multiselect.css",
                      "~/Content/site.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/users/usersList").Include(
                        "~/Scripts/TypeScript/Users/UsersList.js"));

            bundles.Add(new ScriptBundle("~/bundles/customers/customerDetails").Include(
            "~/Scripts/TypeScript/Customers/CustomerDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/installationObjects/installationObjectsList").Include(
                        "~/Scripts/TypeScript/InstallationObjects/InstallationObjectsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/configuration/configurationList").Include(
                        "~/Scripts/TypeScript/Configuration/ConfigurationList.js"));

            bundles.Add(new ScriptBundle("~/bundles/products/productsList").Include(
                        "~/Scripts/TypeScript/Products/ProductsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/products/productDetails").Include(
                        "~/Scripts/TypeScript/Products/ProductDetails.js"));
            

            bundles.Add(new ScriptBundle("~/bundles/installationObjects/installationObjectDetails").Include(
                        "~/Scripts/TypeScript/InstallationObjects/InstallationObjectDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/customers/customersList").Include(
                         "~/Scripts/TypeScript/Customers/CustomersList.js"));

            bundles.Add(new ScriptBundle("~/bundles/contacts/contactsList").Include(
                         "~/Scripts/TypeScript/Contacts/ContactsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/submittedReports/submittedReportsList").Include(
                         "~/Scripts/TypeScript/SubmittedReports/SubmittedReportsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/weeklyPlans/weeklyPlansList").Include(
                         "~/Scripts/TypeScript/WeeklyPlans/WeeklyPlansList.js"));

            bundles.Add(new ScriptBundle("~/bundles/weeklyPlans/weeklyPlanDetails").Include(
                         "~/Scripts/TypeScript/WeeklyPlans/_WeeklyPlanDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/monthlyReports/monthlyReportsList").Include(
                         "~/Scripts/TypeScript/MonthlyReports/MonthlyReportsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/monthlyReports/monthlyReportDetails").Include(
                         "~/Scripts/TypeScript/MonthlyReports/_MonthlyReportDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/personalProducts/personalProductsList").Include(
                         "~/Scripts/TypeScript/PersonalProducts/PersonalProductsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/login/login").Include(
                         "~/Scripts/TypeScript/Login/Login.js"));

            bundles.Add(new ScriptBundle("~/bundles/offers/offersList").Include(
                         "~/Scripts/TypeScript/Offers/OffersList.js"));

            bundles.Add(new ScriptBundle("~/bundles/orders/ordersList").Include(
                         "~/Scripts/TypeScript/Orders/OrdersList.js"));

            bundles.Add(new ScriptBundle("~/bundles/shared/offerDetails").Include(
                         "~/Scripts/TypeScript/Shared/OfferDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/orders/orderDetails").Include(
                         "~/Scripts/TypeScript/Orders/OrderDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/documents/invoicesList").Include(
                         "~/Scripts/TypeScript/Documents/InvoicesList.js"));

            bundles.Add(new ScriptBundle("~/bundles/documents/wZDocsList").Include(
                         "~/Scripts/TypeScript/Documents/WZDOcsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/activitiesAnalysis/activitiesAnalysisList").Include(
                         "~/Scripts/TypeScript/ActivitiesAnalysis/activitiesAnalysisList.js"));

            bundles.Add(new ScriptBundle("~/bundles/detailedAnalysis/detailedAnalysisList").Include(
             "~/Scripts/TypeScript/DetailedAnalysis/detailedAnalysisList.js"));

            bundles.Add(new ScriptBundle("~/bundles/campaigns/campaignsList").Include(
             "~/Scripts/TypeScript/Campaigns/CampaignsList.js"));

            bundles.Add(new ScriptBundle("~/bundles/shared/navbar").Include(
                        "~/Scripts/TypeScript/Shared/Navbar.js"));


            bundles.Add(new ScriptBundle("~/bundles/dashboard").Include(
                      "~/Scripts/raphael/raphael.js",
                      "~/Scripts/data/morris-data.js",
                      "~/Scripts/morrisjs/morris.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/_HoodSelectionOfferHoodDetailsModal").Include(
                 "~/Scripts/TypeScript/HoodSelection/_HoodSelectionOfferHoodDetailsModal.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/_HoodSelectionOfferDetailsAirCalculation").Include(
                "~/Scripts/TypeScript/HoodSelection/_HoodSelectionOfferDetailsAirCalculation.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/hoodSelectionHoodPartsPriceList").Include(
                         "~/Scripts/TypeScript/HoodSelection/HoodSelectionHoodPartsPriceList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/hoodSelectionOfferList").Include(
             "~/Scripts/TypeScript/HoodSelection/HoodSelectionOfferList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/hoodSelectionFinishedOfferList").Include(
             "~/Scripts/TypeScript/HoodSelection/HoodSelectionFinishedOfferList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/_HoodSelectionOfferDetailsForm").Include(
                "~/Scripts/TypeScript/HoodSelection/_HoodSelectionOfferDetailsForm.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/_HoodSelectionOfferDetailsHoodList").Include(
                "~/Scripts/TypeScript/HoodSelection/_HoodSelectionOfferDetailsHoodList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/HoodSelectionAllOfferDetailsHoodList").Include(
                "~/Scripts/TypeScript/HoodSelection/HoodSelectionAllOfferDetailsHoodList.js"));

            bundles.Add(new ScriptBundle("~/bundles/users/_UserDetails").Include(
                "~/Scripts/TypeScript/Users/_UserDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/contacts/_ContactDetails").Include(
                    "~/Scripts/TypeScript/Contacts/_ContactDetails.js"));

            //bundles.Add(new ScriptBundle("~/bundles/hoodFinalOffer/HoodFinalOfferList").Include(
            //            "~/Scripts/TypeScript/HoodFinalOffer/HoodFinalOfferList.js"));

            //bundles.Add(new ScriptBundle("~/bundles/hoodFinalOffer/_HoodFinalOfferDetails").Include(
            //            "~/Scripts/TypeScript/HoodFinalOffer/_HoodFinalOfferDetails.js"));

            //bundles.Add(new ScriptBundle("~/bundles/hoodOrders/hoodOrdersList").Include(
            //             "~/Scripts/TypeScript/HoodOrders/HoodOrdersList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/hoodFinalOfferList").Include(
                "~/Scripts/TypeScript/HoodSelection/HoodFinalOfferList.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/_hoodFinalOfferDetails").Include(
                "~/Scripts/TypeScript/HoodSelection/_HoodFinalOfferDetails.js"));

            bundles.Add(new ScriptBundle("~/bundles/hoodSelection/hoodOrdersList").Include(
                "~/Scripts/TypeScript/HoodSelection/HoodOrdersList.js"));

            BundleTable.EnableOptimizations = bool.Parse(ConfigurationManager.AppSettings["BundleEnableOptimization"]);
        }
    }
}


