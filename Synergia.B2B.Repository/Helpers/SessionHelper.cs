using Synergia.B2B.Common.Entities;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace Synergia.B2B.Repository.Helpers
{
    public class SessionHelper
    {
        private static HttpSessionState Session
        {
            get
            {
                return HttpContext.Current.Session;
            }
        }

        public static IEnumerable<SC> SCList
        {
            get
            {
                if (Session != null && Session["SCList"] != null)
                {
                    return Session["SCList"] as IEnumerable<SC>;
                }
                else
                {
                    return new SCRepository().GetAll();
                }

            }
            set
            {
                Session["SCList"] = value;
            }
        }

        public static string FilePath
        {
            get
            {
                //return Session["FilePath"] as string;
                return SCList.Where(s => s.Type == "twfoto").Single().SourcePath;
            }
        }

        public static string DocumentPath
        {
            get
            {
                //return Session["DocumentPath"] as string;
                return SCList.Where(s => s.Type == "twdok").Single().SourcePath;

            }
        }

        public static string KHDocPath
        {
            get
            {
                return SCList.Where(s => s.Type == "khdok").Single().SourcePath;
            }
        }

        public static string CrmFilesPath
        {
            get
            {
                return SCList.Where(s => s.Type == "crmfiles").Single().SourcePath;
            }
        }

        public static string CrmHoodOfferFilesPath
        {
            get
            {
                return SCList.Where(s => s.Type == "hoodofferfiles").Single().SourcePath;
            }
        }

        public static bool IsWelcomeTextShown
        {
            get
            {
                return Session["IsWelcomeTextShown"] != null ? (bool)Session["IsWelcomeTextShown"] : false;
            }
            set
            {
                Session["IsWelcomeTextShown"] = value;

            }
        }

        public static string WelcomeText
        {
            get
            {
                return Session["WelcomeText"] as string;
            }
            set
            {
                Session["WelcomeText"] = value;
            }
        }

        public static string BirthdayTextSmall
        {
            get
            {
                return Session["BirthdayTextSmall"] as string;
            }
            set
            {
                Session["BirthdayTextSmall"] = value;
            }
        }

        public static string BirthdayTextBig
        {
            get
            {
                return Session["BirthdayTextBig"] as string;
            }
            set
            {
                Session["BirthdayTextBig"] = value;
            }
        }

        public static User LoggedUser
        {
            get
            {
                return Session["LoggedUser"] as User;
            }
            set
            {
                Session["LoggedUser"] = value;
            }
        }

        public static bool IsContactBirthdayReminderShown
        {
            get
            {
                return Session["IsContactBirthdayReminderShown"] != null ? (bool)Session["IsContactBirthdayReminderShown"] : false;
            }
            set
            {
                Session["IsContactBirthdayReminderShown"] = value;

            }
        }

        public static List<Contact> ContactBirthdayReminderItems
        {
            get
            {
                return Session["ContactBirthdayReminderItems"] as List<Contact>;
            }
            set
            {
                Session["ContactBirthdayReminderItems"] = value;

            }
        }

        public static int? ChangePasswordUserId
        {
            get
            {
                return Session["ChangePasswordUserId"] as int?;
            }
            set
            {
                Session["ChangePasswordUserId"] = value;
            }
        }
    }
}
