using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, AdministrationSection")]
    public class ApiConfigurationController : ApiController
    {
        [HttpPost]
        public int? SaveConfiguration([FromBody]ConfigurationViewModel model)
        {
            try
            {
                ConfigurationRepository configurationRepository = new ConfigurationRepository();
                Configuration configuration = model.Id.HasValue ? configurationRepository.GetConfiguration() : new Configuration();
                configuration.WelcomeText = model.WelcomeText;
                configuration.OverrideUserWelcomeText = model.OverrideUserWelcomeText;
                configuration.BigBirthdayText = model.BigBirthdayText;
                configuration.SmallBirthdayText = model.SmallBirthdayText;
                configuration.OrderEmailRecipients = model.OrderEmailRecipients;
                //configuration.HoodOrderEmailRecipients = model.HoodOrderEmailRecipients;
                //configuration.SubmittedMonthlyReportEmailRecipients = model.SubmittedMonthlyReportEmailRecipients;

                if (configuration.Id == 0)
                {
                    configurationRepository.Add(configuration);
                }
                else
                {
                    configurationRepository.Update(configuration);
                }

                return configuration.Id;
            }
            catch(Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public Configuration GetConfiguration()
        {
            ConfigurationRepository configurationRepository = new ConfigurationRepository();
            Configuration result = configurationRepository.GetConfiguration();

            return result;
        }
    }
}