using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Services.Mail
{
    public class OrderMailMessageService : MailMessageService
    {
        protected Order Order { get; set; }
        protected Customer SellerCustomer { get; set; }
        protected OfferCompany CustomerOfferCompany { get; set; } 

        public OrderMailMessageService(int orderId)
            : base("MailTemplateBasePremailer.html")
        {
            try
            {
                Order = new OrderRepository().GetById(orderId);
                SellerCustomer = new CustomerRepository().GetById(Order.SellerFirmaId);
                CustomerOfferCompany = new OfferCompanyRepository().GetById(Order.CustomerOfferCompanyId.Value);

                Configuration configuration = new ConfigurationRepository().GetConfiguration();
                Recipients.AddRange(configuration.OrderEmailRecipients?.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList());

                File orderPdfFile = new FileRepository().GetById(Order.PdfFileId.Value);
                Attachments.Add(orderPdfFile);

                Subject = $"Zamówienie ZAM/{Order.OrderNumber}";
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }

        protected override void ConfigureReplacements()
        {
            base.ConfigureReplacements();

            Replacements.Add("#Content#", $"Zamówienie od firmy {SellerCustomer.Name} dla firmy {CustomerOfferCompany.Name}");
        }
    }
}
