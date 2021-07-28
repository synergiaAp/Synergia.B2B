using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class SynergiaHelper
    {
        public const int GroupMainParId = 2200;

        public static string GetHoodFinalOfferElementTypeCode(HoodFinalOfferElementType type)
        {
            switch (type)
            {
                case HoodFinalOfferElementType.Hood:
                    return "ZMJ";
                case HoodFinalOfferElementType.Ventilator:
                    return "ZN";
                case HoodFinalOfferElementType.Smoki:
                    return "SM";
                case HoodFinalOfferElementType.Ansul:
                    return "ANS";
                case HoodFinalOfferElementType.CookAir:
                    return "ZCA";
                case HoodFinalOfferElementType.KES:
                    return "ZST";
                case HoodFinalOfferElementType.Other:
                default:
                    return "WNR";
            }
        }

        public static string GetHoodFinalOfferNumber(string offerNumber, string regionCode)
        {
            return $"{offerNumber.Substring(0, 5)}/{regionCode}{offerNumber.Substring(5, offerNumber.Length - offerNumber.IndexOf("_"))}";
        }

        public static string GetHoodFinalOfferProductName(HoodFinalOfferElementType type, string productCode)
        {
            switch (type)
            {
                case HoodFinalOfferElementType.Hood:
                    if (productCode.StartsWith("JSI"))
                    {
                        return "Okap wyciągowo-nawiewny";
                    }
                    else if (productCode.StartsWith("JSVI"))
                    {
                        return "Okap wyciągowo-nawiewny";
                    }
                    else if (productCode.StartsWith("JVI"))
                    {
                        return "Okap wyciągowy z wiązką wychwytującą";
                    }
                    else if (productCode.StartsWith("JLI"))
                    {
                        return "Okap wyciągowy";
                    }
                    else if (productCode.StartsWith("JSKI"))
                    {
                        return "Okap kondensacyjny wyciągowo-nawiewny";
                    }
                    else if (productCode.StartsWith("JKI"))
                    {
                        return "Okap kondensacyjny wyciągowy";
                    }
                    else
                    {
                        return null;
                    }
                case HoodFinalOfferElementType.Ventilator:
                    return "Nawiewnik wyporowy do kuchni";
                case HoodFinalOfferElementType.Smoki:
                    return "Filtr do sadzy";
                case HoodFinalOfferElementType.Ansul:
                    return "System gaśniczy do okapu";
                case HoodFinalOfferElementType.Other:
                default:
                    return null;
            }
        }

        public static string GetHoodFileName(string productCode)
        {
            string imgFileName = "";
            if (productCode.StartsWith("JSI-R")
                || productCode.StartsWith("JSI-S")
                || productCode.StartsWith("JSVI-S")
                || productCode.StartsWith("JSVI-S-W")
                || productCode.StartsWith("JSVI-R")
                || productCode.StartsWith("JSVI-R-W")
            )
            {
                imgFileName = "JEVEN_JSI_filtr_";
            }
            else if (productCode.StartsWith("JVI-R")
              || productCode.StartsWith("JVI-R-W"))
            {
                imgFileName = "JEVEN_JVI_filtr_";
            }
            else if (productCode.StartsWith("JLI-R")
              || productCode.StartsWith("JLI-S"))
            {
                imgFileName = "JEVEN_JLI_filtr_";
            }
            else if (productCode.StartsWith("JSKI"))
            {
                return "JEVEN_JSKI_dol_pop.png";
            }
            else if (productCode.StartsWith("JKI"))
            {
                return "JEVEN_JKI_dol_pop.png";
            }

            if (string.IsNullOrEmpty(imgFileName))
            {
                return null;
            }

            if (productCode.Contains("UV-Turbo")
                || productCode.Contains("Turbo"))
            {
                imgFileName += "TURBOSWING";
            }
            else
            {
                imgFileName += "JFF";
            }
            imgFileName += "_dol_pop.png";
            return imgFileName;
        }

        public static string GetHoodAccessoryFileName(string productCode)
        {
            string accessoryName = productCode.ToLower();
            if (accessoryName.Contains("ansul"))
            {
                return "ANSUL.png";
            }
            else if (accessoryName.Contains("junior"))
            {
                return "SMOKI JUNIOR.jpg";
            }
            else if (accessoryName.Contains("maxi"))
            {
                return "SMOKI MAXI GRILL.jpg";
            }
            else if (accessoryName.Contains("jrs"))
            {
                return "Nawiewnik JRS.jpg";
            }
            return null;
        }
    }
}
