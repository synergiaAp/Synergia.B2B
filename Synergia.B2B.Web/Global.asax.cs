using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Synergia.B2B.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            MappingConfig.RegisterMappings();
        }

        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
            if (User.Identity.IsAuthenticated && HttpContext.Current.Session != null && SessionHelper.LoggedUser == null)
            {
                SCRepository sCRepository = new SCRepository();
                IEnumerable<SC> sCList = sCRepository.GetAll();
                SessionHelper.SCList = sCList;

                UserRepository userRepository = new UserRepository();
                User user = userRepository.GetByLogin(User.Identity.Name);   // User z mechanizmu autentykacji MVC
                SessionHelper.LoggedUser = user;
                ConfigurationRepository configurationRepository = new ConfigurationRepository();
                Configuration configuration = configurationRepository.GetConfiguration();
                SessionHelper.BirthdayTextSmall = configuration.SmallBirthdayText;
                SessionHelper.BirthdayTextBig = configuration.BigBirthdayText;
                SessionHelper.ContactBirthdayReminderItems = new ContactRepository().GetToBirthdayReminder(user.Id);
                if (configuration != null && (string.IsNullOrEmpty(user.WelcomeText) || configuration.OverrideUserWelcomeText))
                {
                    SessionHelper.WelcomeText = configuration.WelcomeText;
                }
                else
                {
                    SessionHelper.WelcomeText = user.WelcomeText;
                }
            }
        }
    }
}
