using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class DeliveryTimeDaysHelper
    {
        public static string GetReplacement(List<DeliveryTimeDaysItem> items)
        {
            try
            {
                StringBuilder sbResult = new StringBuilder();
                var deliveryTimeDays = items.Select(x => x.DeliveryTimeDays).Distinct().OrderBy(x => x).ToList();

                if (deliveryTimeDays.Count == 1)
                {
                    sbResult.Append($"{items[0].DeliveryTimeDays} dni roboczych od daty wpłacenia zadatku.");
                }
                else
                {
                    sbResult.Append("<ul>");
                    foreach (var deliveryTimeDay in deliveryTimeDays)
                    {
                        var positions = items.Where(x => x.DeliveryTimeDays == deliveryTimeDay).OrderBy(x => x.Position).Select(x => x.Position).ToList();
                        if(positions.Count == 1)
                        {
                            sbResult.Append($"<li>pozycja {positions[0]}: {deliveryTimeDay} dni roboczych od daty wpłacenia zadatku</li>");
                        }
                        else
                        {
                            sbResult.Append("<li>pozycje ");

                            List<string> groupedPositions = positions
                              .Select((n, i) => new { number = n, group = n - i })
                              .GroupBy(n => n.group)
                              .Select(g =>
                                g.Count() >= 2 ?
                                  g.First().number + "-" + g.Last().number
                                :
                                  string.Join(", ", g.Select(x => x.number))
                              )
                              .ToList();

                            sbResult.Append(string.Join(", ", groupedPositions));
                            sbResult.Append($": {deliveryTimeDay} dni roboczych od daty wpłacenia zadatku</li>");
                        }
                    }
                    sbResult.Append("</ul>");
                }
                return sbResult.ToString();
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }

    public class DeliveryTimeDaysItem
    {
        public int Position { get; set; }
        public byte DeliveryTimeDays { get; set; }
    }
}
