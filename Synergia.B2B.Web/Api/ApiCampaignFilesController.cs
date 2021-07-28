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
using System.Web;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, ManagerSection")]
    public class ApiCampaignFilesController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetCampaignFiles([FromUri]CampaignFilesGridParametersDto model)
        {
            GridResultDto result = new CampaignFileRepository().GridGetCampaignFiles(model);

            return result;
        }

        [HttpPost]
        public int? DeleteCampaignFile([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                CampaignFileRepository campaignFileRepository = new CampaignFileRepository();
                CampaignFile campaignFile = campaignFileRepository.GetById(id);
                campaignFile.IsDeleted = true;
                campaignFile.ModifiedOn = DateTime.Now;
                campaignFile.ModifiedByUserId = loggedUser.Id;
                campaignFileRepository.Update(campaignFile);
                return campaignFile.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public bool AddFile([FromUri]int campaignId)
        {
            try
            {
                bool result = false;
                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    FileRepository fileRepository = new FileRepository();
                    CampaignFileRepository campaignFileRepository = new CampaignFileRepository();
                    User loggedUser = GetLoggedUser();

                    using (var tran = new TransactionScope())
                    {
                        bool isOK = true;
                        for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                        {
                            HttpPostedFile file = HttpContext.Current.Request.Files[i];
                        
                            int? savedFileId = fileRepository.Save(file, FileType.CampaignFile);
                            if (!savedFileId.HasValue)
                            {
                                isOK = false;
                            }
                            else
                            {
                                CampaignFile campaignFile = new CampaignFile()
                                {
                                    CampaignId = campaignId,
                                    CreatedByUserId = loggedUser.Id,
                                    CreatedOn = DateTime.Now,
                                    FileId = savedFileId.Value,
                                    ModifiedByUserId = loggedUser.Id,
                                    ModifiedOn = DateTime.Now,
                                };
                                campaignFileRepository.Add(campaignFile);
                            }
                        }
                        if (isOK)
                        {
                            tran.Complete();
                            result = true;
                        }
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
    }
}
