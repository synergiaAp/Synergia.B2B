using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Extensions
{
    public static class StringExtension
    {
        public static string ReplaceNewLineToHtml(this string source)
        {
            if (!string.IsNullOrEmpty(source))
            {
                return source.Replace("\r\n", "<br/>").Replace("\n", "<br/>").Replace("\r", "<br/>");
            }
            return source;
        }

        public static string ReplaceNewLineToEmpty(this string source, string replacement = "")
        {
            if (!string.IsNullOrEmpty(source))
            {
                return source.Replace("\r\n", replacement).Replace("\n", replacement).Replace("\r", replacement);
            }
            return source;
        }

        public static string ReplaceIgnoreCase(this string source, string oldString, string newString)
        {
            if (!string.IsNullOrEmpty(source))
            {
                if (string.IsNullOrEmpty(newString))
                {
                    newString = "";
                }
                source = Regex.Replace(source, oldString, newString, RegexOptions.IgnoreCase);
            }
            return source;
        }

        public static List<T> ToList<T>(this string input)
        {
            return input.ToList<T>(',');
        }

        public static List<T> ToList<T>(this string input, char delimeter)
        {
            try
            {
                List<T> result = new List<T>();

                if (!string.IsNullOrEmpty(input))
                {
                    string[] splittedItems = input.Split(new char[] { delimeter }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var item in splittedItems)
                    {
                        result.Add((T)Convert.ChangeType(item, typeof(T)));
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public static bool ContainsCaseInsensitive(this string source, string value)
        {
            return source.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        public static string TrimDoubleSpaces(this string source)
        {
            if (!string.IsNullOrEmpty(source))
            {
                source = Regex.Replace(source, @"\s+", " ");
            }
            return source;
        }

        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }
            return value.Length <= maxLength 
                ? value 
                : value.Substring(0, maxLength);
        }
    }
}
