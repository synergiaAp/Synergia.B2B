using Synergia.B2B.Common.Dto.Api.Campaign;
using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, ManagerSection")]
    public class ApiCampaignContactsController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetCampaignContacts([FromUri]CampaignContactsGridParametersDto model)
        {
            GridResultDto result = new CampaignContactRepository().GridGetCampaignContacts(model);

            return result;
        }

        [HttpGet]
        public GridResultDto GridGetAvailableContacts([FromUri]AvailableContactsCampaignGridParametersDto model)
        {
            GridResultDto result = new CampaignContactRepository().GridGetAvailableContacts(model);

            return result;
        }

        [HttpPost]
        public int? DeleteCampaignContact([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                CampaignContactRepository campaignContactRepository = new CampaignContactRepository();
                CampaignContact campaignContact = campaignContactRepository.GetById(id);
                campaignContact.IsDeleted = true;
                campaignContact.ModifiedOn = DateTime.Now;
                campaignContact.ModifiedByUserId = loggedUser.Id;
                campaignContactRepository.Update(campaignContact);
                return campaignContact.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public bool DeleteAllCampaignContacts([FromBody]int campaignId)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                CampaignContactRepository campaignContactRepository = new CampaignContactRepository();

                using (var tran = new TransactionScope())
                {
                    List<CampaignContact> allCampaignContacts = campaignContactRepository.GetByCampaignId(campaignId).ToList();
                    foreach (var campaignContact in allCampaignContacts)
                    {
                        campaignContact.IsDeleted = true;
                        campaignContact.ModifiedOn = DateTime.Now;
                        campaignContact.ModifiedByUserId = loggedUser.Id;
                        campaignContactRepository.Update(campaignContact);
                    }
                    tran.Complete();
                }
                
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        [HttpPost]
        public bool AddCampaignContacts([FromBody]AddCampaignContactsParametersDto model)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                using (TransactionScope tran = new TransactionScope())
                {
                    CampaignContactRepository campaignContactRepository = new CampaignContactRepository();
                    ContactRepository contactRepository = new ContactRepository();

                    foreach (var contactId in model.ContactIds)
                    {
                        CampaignContact campaignContact = campaignContactRepository.GetByContactId(model.CampaignId, contactId);
                        if(campaignContact == null)
                        {
                            Contact contact = contactRepository.GetById(contactId);
                            campaignContact = new CampaignContact()
                            {
                                CampaignId = model.CampaignId,
                                ContactId = contactId,
                                CreatedByUserId = loggedUser.Id,
                                ModifiedByUserId = loggedUser.Id,
                                CreatedOn = DateTime.Now,
                                ModifiedOn = DateTime.Now,
                                Status = CampaignContactStatus.ToSend.ToByte(),
                                Email = contact.Email
                            };
                            campaignContactRepository.Add(campaignContact);
                        }
                    }
                    tran.Complete();
                }
                    
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }
    }
}
