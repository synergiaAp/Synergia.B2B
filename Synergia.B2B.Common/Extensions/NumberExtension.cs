using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Extensions
{
    public static class NumberExtension
    {
        #region Decimal
        public static string ToString2DecimalPlaces(this decimal? value)
        {
            return value.HasValue ? value.Value.ToString2DecimalPlaces() : "";
        }

        public static string ToString1DecimalPlace(this decimal? value)
        {
            return value.HasValue ? value.Value.ToString1DecimalPlace() : "";
        }

        public static string ToString2DecimalPlacesWithSpaces(this decimal? value)
        {
            return value.HasValue ? value.Value.ToString2DecimalPlacesWithSpaces() : "";
        }

        public static string ToString2DecimalPlaces(this decimal value)
        {
            return Regex.Replace(((double)value).ToString("n2"), @"\s+", "");
        }

        public static string ToString1DecimalPlace(this decimal value)
        {
            return Regex.Replace(((double)value).ToString("n1"), @"\s+", "");
        }

        public static string ToString2DecimalPlacesWithSpaces(this decimal value)
        {
            return ((double)value).ToString("n2");//.Replace(",", " ");
        }

        public static decimal RoundDown(this decimal value, double decimalPlaces)
        {
            var power = Math.Pow(10, decimalPlaces);
            return (decimal)(Math.Floor((double)value * power) / power);
        }
        #endregion Decimal
    }
}
