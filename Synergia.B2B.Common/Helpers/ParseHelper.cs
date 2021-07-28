using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class ParseHelper
    {
        public static int ToInt(object obj)
        {
            if (obj == null) { return 0; }

            int val;
            if (int.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return 0;
        }

        public static int? ToIntN(object obj)
        {
            if (obj == null) { return null; }

            int? ret = null;
            int val;
            if (int.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static long ToLong(object obj)
        {
            if (obj == null) { return 0; }

            long val;
            if (long.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return 0;
        }

        public static long? ToLongN(object obj)
        {
            if (obj == null) { return null; }

            long? ret = null;
            long val;
            if (long.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static decimal ToDecimal(object obj)
        {
            if (obj == null) { return 0; }

            decimal val;
            if (decimal.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return 0;
        }

        public static decimal? ToDecimalN(object obj)
        {
            if (obj == null) { return null; }

            decimal? ret = null;
            decimal val;
            if (decimal.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static double ToDouble(object obj)
        {
            if (obj == null) { return 0; }

            double val;
            if (double.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return 0;
        }

        public static double? ToDoubleN(object obj)
        {
            if (obj == null) { return null; }

            double? ret = null;
            double val;
            if (double.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static byte ToByte(object obj)
        {
            if (obj == null) { return 0; }

            byte val;
            if (byte.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return 0;
        }

        public static byte? ToByteN(object obj)
        {
            if (obj == null) { return null; }

            byte? ret = null;
            byte val;
            if (byte.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static byte[] ToBytes(object obj)
        {
            if (obj == null)
            {
                return null;
            }
            BinaryFormatter bf = new BinaryFormatter();
            MemoryStream ms = new MemoryStream();
            bf.Serialize(ms, obj);
            return ms.ToArray();
        }

        public static DateTime ToDateTime(object obj)
        {
            if (obj == null) { return DateTime.MinValue; }

            DateTime val;
            if (DateTime.TryParse(obj.ToString(), out val))
            {
                return DateTime.SpecifyKind(val, DateTimeKind.Utc);
                //return val;
            }
            return DateTime.MinValue;
        }

        public static DateTime? ToDateTimeN(object obj)
        {
            if (obj == null) { return null; }

            DateTime? ret = null;
            DateTime val;
            if (DateTime.TryParse(obj.ToString(), out val))
            {
                ret = DateTime.SpecifyKind(val, DateTimeKind.Utc);
                //ret = val;
            }
            return ret;
        }

        public static DateTime? ToDateTimeN(object obj, string format)
        {
            if (obj == null) { return null; }

            DateTime? ret = null;
            DateTime val;
            if (DateTime.TryParseExact(obj.ToString(), format, null, System.Globalization.DateTimeStyles.None, out val))
            {
                ret = DateTime.SpecifyKind(val, DateTimeKind.Utc);
            }
            return ret;
        }

        public static TimeSpan ToTimeSpan(object obj)
        {
            if (obj == null) { return TimeSpan.MinValue; }

            TimeSpan ret = TimeSpan.MinValue;
            TimeSpan val;
            if (TimeSpan.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static TimeSpan ToTimeSpan(object obj, string format)
        {
            if (obj == null) { return TimeSpan.MinValue; }

            TimeSpan ret = TimeSpan.MinValue;
            TimeSpan val;
            if (TimeSpan.TryParseExact(obj.ToString(), format, null, System.Globalization.TimeSpanStyles.None, out val))
            {
                ret = val;
            }
            return ret;
        }

        public static TimeSpan? ToTimeSpanN(object obj)
        {
            if (obj == null) { return null; }

            TimeSpan? ret = null;
            TimeSpan val;
            if (TimeSpan.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static TimeSpan? ToTimeSpanN(object obj, string format)
        {
            if (obj == null) { return null; }

            TimeSpan? ret = null;
            TimeSpan val;
            if (TimeSpan.TryParseExact(obj.ToString(), format, null, System.Globalization.TimeSpanStyles.None, out val))
            {
                ret = val;
            }
            return ret;
        }

        public static bool ToBool(object obj)
        {
            if (obj == null) { return false; }

            bool val;
            if (bool.TryParse(obj.ToString(), out val))
            {
                return val;
            }
            return false;
        }

        public static bool? ToBoolN(object obj)
        {
            if (obj == null) { return null; }

            bool? ret = null;
            bool val;
            if (bool.TryParse(obj.ToString(), out val))
            {
                ret = val;
            }
            return ret;
        }

        public static string ToString(object obj)
        {
            if (obj == null) { return ""; }

            return obj.ToString();
        }
    }
}
