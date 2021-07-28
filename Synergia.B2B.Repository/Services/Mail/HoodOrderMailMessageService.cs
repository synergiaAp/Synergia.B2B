//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using Synergia.B2B.Repository.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Services.Mail
//{
//    public class HoodOrderMailMessageService : MailMessageService
//    {
//        protected HoodFinalOffer HoodFinalOffer { get; set; }
//        protected List<HoodOrder> HoodOrders { get; set; } = new List<HoodOrder>();
//        protected OfferCompany CustomerOfferCompany { get; set; }

//        public HoodOrderMailMessageService(List<int> hoodOrderIds)
//            : base("MailTemplateBasePremailer.html")
//        {
//            try
//            {
//                var hoodOrderRepository = new HoodOrderRepository();
//                foreach (var hoodOrderId in hoodOrderIds)
//                {
//                    var hoodOrder = hoodOrderRepository.GetById(hoodOrderId);
//                    HoodOrders.Add(hoodOrder);

//                    if (CustomerOfferCompany == null)
//                    {
//                        CustomerOfferCompany = new OfferCompanyRepository().GetById(hoodOrder.CustomerId.Value);
//                    }

//                    if (HoodFinalOffer == null)
//                    {
//                        HoodFinalOffer = new HoodFinalOfferRepository().GetById(hoodOrder.HoodFinalOfferId);
//                    }
//                }

//                Configuration configuration = new ConfigurationRepository().GetConfiguration();
//                Recipients.AddRange(configuration.HoodOrderEmailRecipients?.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList());

//                var hoodFinalOfferPdfFile = new FileRepository().GetById(HoodFinalOffer.OfferPdfFileId.Value);
//                Attachments.Add(hoodFinalOfferPdfFile);

//                var region = new RegionRepository().GetById(HoodFinalOffer.RegionId);

//                Subject = $"Zamówienie z regionu {region.Code}";
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }

//        protected override void ConfigureReplacements()
//        {
//            base.ConfigureReplacements();

//            string orderNumbersReplacement = "<h3>Numery zamówień:</h3><ul>";
//            foreach (var hoodOrder in HoodOrders)
//            {
//                orderNumbersReplacement += $"<li>{hoodOrder.OrderType}/{hoodOrder.OrderNumber}/{hoodOrder.OrderDate.Value.ToString("yy")}</li>";
//            }
//            orderNumbersReplacement += "</ul>";

//            if (!string.IsNullOrEmpty(HoodFinalOffer.Comment))
//            {
//                orderNumbersReplacement += $"<div><b>Uwagi:</b></div><div>{HoodFinalOffer.Comment.ReplaceNewLineToHtml()}</div>";
//            }

//            Replacements.Add("#Content#", orderNumbersReplacement);
//        }
//    }
//}
