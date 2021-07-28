using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Extensions
{
    public static class DateTimeExtension
    {
        public static string ToTimestamp(this DateTime value)
        {
            return value.ToString("yyyyMMddHHmmss");
        }

        public static string ToWeekString(this DateTime value)
        {
            return $"{value.AddDays(6).Year}-{value.GetIso8601WeekOfYear()}";
        }

        public static byte GetIso8601WeekOfYear(this DateTime value)
        {
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(value);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                value = value.AddDays(3);
            }

            return (byte)CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(value, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }

        public static DateTime StartOfWeek(this DateTime dt)
        {
            int diff = (7 + (dt.DayOfWeek - DayOfWeek.Monday)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }
    }
}
