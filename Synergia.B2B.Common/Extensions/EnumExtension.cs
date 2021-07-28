using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Extensions
{
    public static class EnumExtension
    {
        public static string GetDescription(this Enum enumValue)
        {
            return EnumHelper.GetEnumDescription(enumValue);
        }

        public static string GetValue(this Enum enumValue)
        {
            return EnumHelper.GetValue(enumValue);
        }

        public static byte ToByte(this Enum enumValue)
        {
            return EnumHelper.ToByte(enumValue);
        }

        public static byte? ToByteN(this Enum enumValue)
        {
            return enumValue != null ? EnumHelper.ToByte(enumValue) : (byte?)null;
        }

        public static int ToInt(this Enum enumValue)
        {
            return EnumHelper.ToInt(enumValue);
        }

        public static long ToLong(this Enum enumValue)
        {
            return EnumHelper.ToLong(enumValue);
        }

    }
}
