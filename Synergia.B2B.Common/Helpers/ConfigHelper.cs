using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class ConfigHelper
    {
        public static string GetValue(string name)
        {
            return ConfigurationManager.AppSettings[name];
        }

        public static string CRMApplicationUrl
        {
            get
            {
                return GetValue("CRMApplicationUrl");
            }
        }
    }
}
