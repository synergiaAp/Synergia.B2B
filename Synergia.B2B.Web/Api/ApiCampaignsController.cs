using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Repository.Services.Mail;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    public class ApiCampaignsController : ApiBaseController
    {
        [HttpPost]
        [Authorize(Roles = "Admin, ManagerSection")]
        public int? CopyCampaign([FromBody]int campaignId)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                CampaignRepository campaignRepository = new CampaignRepository();
                Campaign campaign = campaignRepository.GetById(campaignId);
                Campaign newCampaign = new Campaign()
                {
                    CreatedByUserId = loggedUser.Id,
                    CreatedOn = DateTime.Now,
                    ModifiedByUserId = loggedUser.Id,
                    ModifiedOn = DateTime.Now,
                    OwnerUserId = campaign.OwnerUserId,
                    Status = CampaignStatus.Pending.ToByte(),
                    CopiedFromCampaignId = campaignId,
                    IsDeleted = false,
                    MessageContent = campaign.MessageContent,
                    MessageSubject = campaign.MessageSubject,
                    Name = campaign.Name + " - Kopia",
                    SendDate = null,
                    StatusChangeDate = null,
                };
                campaignRepository.Add(newCampaign);

                CampaignContactRepository campaignContactRepository = new CampaignContactRepository();
                IEnumerable<CampaignContact> campaignContacts = campaignContactRepository.GetByCampaignId(campaignId);

                foreach (CampaignContact cc in campaignContacts)
                {
                    CampaignContact newCampaignContact = new CampaignContact()
                    {
                        CreatedOn = DateTime.Now,
                        CreatedByUserId = loggedUser.Id,
                        IsDeleted = false,
                        ModifiedByUserId = loggedUser.Id,
                        ModifiedOn = DateTime.Now,
                        CampaignId = newCampaign.Id,
                        Email = cc.Email,
                        Status = CampaignContactStatus.ToSend.ToByte(),
                        StatusChangeDate = null,
                        ContactId = cc.ContactId,
                    };
                    campaignContactRepository.Add(newCampaignContact);
                }

                CampaignFileRepository campaignFileRepository = new CampaignFileRepository();
                IEnumerable<CampaignFile> campaignFiles = campaignFileRepository.GetByCampaignId(campaignId);

                foreach (CampaignFile cf in campaignFiles)
                {
                    CampaignFile newCampaignFile = new CampaignFile()
                    {
                        CreatedOn = DateTime.Now,
                        CreatedByUserId = loggedUser.Id,
                        IsDeleted = false,
                        ModifiedByUserId = loggedUser.Id,
                        ModifiedOn = DateTime.Now,
                        CampaignId = newCampaign.Id,
                        FileId = cf.FileId,
                    };
                    campaignFileRepository.Add(newCampaignFile);
                }

                return newCampaign.Id;

            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public GridResultDto GridGetCampaigns([FromUri]GridParametersDto model)
        {
            GridResultDto result = new CampaignRepository().GridGetCampaigns(model);

            return result;
        }

        [HttpPost]
        public int? DeleteCampaign([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                CampaignRepository campaignRepository = new CampaignRepository();
                Campaign campaign = campaignRepository.GetById(id);
                campaign.IsDeleted = true;
                campaign.ModifiedOn = DateTime.Now;
                campaign.ModifiedByUserId = loggedUser.Id;
                campaignRepository.Update(campaign);
                return campaign.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public int? SaveCampaign([FromBody]CampaignsViewModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                CampaignRepository campaignRepository = new CampaignRepository();
                Campaign campaign = model.Id.HasValue ? campaignRepository.GetById(model.Id.Value) : new Campaign();
                campaign.Name = model.Name;
                campaign.MessageSubject = model.MessageSubject;
                campaign.MessageContent = model.MessageContent;
                campaign.ModifiedOn = DateTime.Now;
                campaign.ModifiedByUserId = loggedUser.Id;
                if (campaign.Id == 0)
                {
                    campaign.CreatedByUserId = loggedUser.Id;
                    campaign.OwnerUserId = loggedUser.Id;
                    campaign.CreatedOn = DateTime.Now;
                    campaign.Status = CampaignStatus.Pending.ToByte();
                }
                if (campaign.Id == 0)
                {
                    campaignRepository.Add(campaign);
                }
                else
                {
                    campaignRepository.Update(campaign);
                }

                return campaign.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public Campaign GetCampaign([FromUri]int id)
        {
            CampaignRepository campaignRepository = new CampaignRepository();
            Campaign campaign = campaignRepository.GetById(id);
            return campaign;
        }

        [HttpPost]
        public bool SendCampaign([FromBody]int campaignId)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                CampaignMailMessageService campaignMailMessageService = new CampaignMailMessageService(campaignId);
                return campaignMailMessageService.Send();
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }
    }
}
