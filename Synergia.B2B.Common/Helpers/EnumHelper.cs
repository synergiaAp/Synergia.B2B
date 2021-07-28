using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class EnumHelper
    {
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0)
            {
                return attributes[0].Description;
            }
            else
            {
                return value.ToString();
            }
        }

        public static string GetValue(Enum value)
        {
            return Convert.ToInt32(value).ToString();
        }

        public static byte ToByte(Enum value)
        {
            return Convert.ToByte(value);
        }

        public static int ToInt(Enum value)
        {
            return Convert.ToInt32(value);
        }

        public static long ToLong(Enum value)
        {
            return Convert.ToInt64(value);
        }

        public static List<T> EnumToList<T>()
        {
            Type enumType = typeof(T);

            // Can't use generic type constraints on value types,
            // so have to do check like this
            if (enumType.BaseType != typeof(Enum))
                throw new ArgumentException("T must be of type System.Enum");

            Array enumValArray = Enum.GetValues(enumType);
            List<T> enumValList = new List<T>(enumValArray.Length);

            foreach (int val in enumValArray)
            {
                enumValList.Add((T)Enum.Parse(enumType, val.ToString()));
            }

            return enumValList;
        }

        public static List<T> EnumToListOrdered<T>()
        {
            Type enumType = typeof(T);

            if (enumType.BaseType != typeof(Enum))
                throw new ArgumentException("T must be of type System.Enum");

            Array enumValArray = Enum.GetValues(enumType);
            List<T> enumValList = new List<T>(enumValArray.Length);

            foreach (Enum item in Enum.GetValues(enumType).Cast<Enum>().OrderBy(e => GetEnumDescription(e)))
            {
                enumValList.Add((T)Enum.Parse(enumType, item.ToString()));
            }

            return enumValList;
        }
    }
}
