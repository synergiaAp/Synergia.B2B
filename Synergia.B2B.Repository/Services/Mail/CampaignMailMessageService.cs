using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Synergia.B2B.Repository.Services.Mail
{
    public class CampaignMailMessageService : MailMessageService
    {
        protected Campaign Campaign { get; set; }
        protected List<CampaignContact> CampaignContacts { get; set; }
        protected List<CampaignFile> CampaignFiles { get; set; }

        private CampaignRepository _campaignRepository = new CampaignRepository();
        private CampaignContactRepository _campaignContactRepository = new CampaignContactRepository();
        private CampaignFileRepository _campaignFileRepository = new CampaignFileRepository();
        private FileRepository _fileRepository = new FileRepository();

        public CampaignMailMessageService(int campaignId)
            : base("MailTemplateBasePremailer.html")
        {
            try
            {
                Campaign = _campaignRepository.GetById(campaignId);
                CampaignContacts = _campaignContactRepository.GetByCampaignId(campaignId).ToList();
                CampaignFiles = _campaignFileRepository.GetByCampaignId(campaignId).ToList();

                Recipients.AddRange(CampaignContacts.Select(cc=>cc.Email));

                foreach (var campaignFile in CampaignFiles)
                {
                    File file = _fileRepository.GetById(campaignFile.FileId);
                    Attachments.Add(file);
                }

                Subject = Campaign.MessageSubject;
                
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }

        public override bool Send()
        {
            try
            {
                bool result = true;
                using (TransactionScope tran = new TransactionScope())
                {
                    DateTime now = DateTime.Now;
                    Campaign.Status = CampaignStatus.Sent.ToByte();
                    Campaign.StatusChangeDate = now;
                    Campaign.SendDate = now;
                    _campaignRepository.Update(Campaign);

                    foreach (var campaignContact in CampaignContacts)
                    {
                        campaignContact.Status = CampaignContactStatus.Sent.ToByte();
                        campaignContact.StatusChangeDate = DateTime.Now;
                        _campaignContactRepository.Update(campaignContact);
                    }

                    result = base.Send();

                    if (result)
                    {
                        tran.Complete();
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        protected override void ConfigureReplacements()
        {
            base.ConfigureReplacements();

            Replacements.Add("#Content#", Campaign.MessageContent.ReplaceNewLineToEmpty());
        }
    }
}
