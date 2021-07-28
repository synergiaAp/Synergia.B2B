//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Services.Mail
//{
//    public class SubmittedMonthlyReportMailMessageService : MailMessageService
//    {
//        protected MonthlyReport MonthlyReport { get; set; }
//        protected User User { get; set; }

//        public SubmittedMonthlyReportMailMessageService(int monthlyReportId)
//            : base("MailTemplateBasePremailer.html")
//        {
//            try
//            {
//                MonthlyReport = new MonthlyReportRepository().GetById(monthlyReportId);
//                User = new UserRepository().GetById(MonthlyReport.CreatedByUserId);

//                Configuration configuration = new ConfigurationRepository().GetConfiguration();
//                Recipients.AddRange(configuration.SubmittedMonthlyReportEmailRecipients?.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList());

//                Subject = $"Raport {MonthlyReport.Date.ToString("MMMM yyyy")} od pracownika {User.FirstName} {User.Surname}";
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }

//        protected override void ConfigureReplacements()
//        {
//            base.ConfigureReplacements();

//            string monthlyReportUrl = $"{ConfigHelper.CRMApplicationUrl}SubmittedReports/Index/{MonthlyReport.Id}";
//            Replacements.Add("#Content#", $"Raport znajduje się po adresem: <a href=\"{monthlyReportUrl}\">{monthlyReportUrl}</a>");
//        }
//    }
//}
