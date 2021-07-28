using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class TemplateHelper
    {
        public static string GetTemplateContent(string templateUrl)
        {
            try
            {
                string result = "";
                using (WebClient wc = new WebClient())
                {
                    wc.Encoding = Encoding.UTF8;
                    result = wc.DownloadString(string.Format("{0}{1}", ConfigHelper.GetValue("CRMApplicationUrl"), templateUrl));
                }
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return "";
            }
        }
    }
}
