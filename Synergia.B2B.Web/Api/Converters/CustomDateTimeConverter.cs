using Synergia.B2B.Common.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Api.Converters
{
    public class CustomDateTimeConverter : DateTimeConverterBase
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                return ParseHelper.ToDateTimeN(reader.Value);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            try
            {
                if (value as DateTime? != null)
                {
                    writer.WriteValue(((DateTime)value).ToString(DateTimeHelper.UniversalDateTimeFormat));
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }
    }
}