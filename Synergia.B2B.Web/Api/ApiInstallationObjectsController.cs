using Synergia.B2B.Common.Dto.Api.Common;
using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Dto.Api.InstallationObject;
using Synergia.B2B.Common.Dto.Api.Offer;
using Synergia.B2B.Common.Dto.Api.Products;
using Synergia.B2B.Common.Dto.Web.Offer;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, Clients, MarenoOffersAndOrders, HoodSelection, HoodOffersAndOrders")]
    public class ApiInstallationObjectsController : ApiBaseController
    {
        [HttpGet]
        public List<SearchObjectResultDto> SearchObject([FromUri]SearchObjectParametersDto model)
        {
            try
            {
                List<InstallationObject> installationObjects = new InstallationObjectRepository().Search(model.Term, model.OfferCompanyId);
                List<SearchObjectResultDto> result = installationObjects.Select(p => new SearchObjectResultDto()
                {
                    Label = p.Name,
                    InstallationObjectId = p.Id
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpGet]
        public GridResultDto GridGetInstallationObjects([FromUri]GridParametersDto model)
        {
            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
            GridResultDto result = installationObjectRepository.GridGetInstallationObjects(model);

            return result;
        }

        [HttpPost]
        public void DeleteInstallationObject([FromBody]int id)
        {
            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
            InstallationObject installationObject = installationObjectRepository.GetById(id);
            installationObject.Status = 1;
            installationObjectRepository.Update(installationObject);
        }

        [HttpPost]
        public void SaveInstallationObject([FromBody]InstallationObjectsViewModel model)
        {
            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
            InstallationObject installationObject = model.Id.HasValue ? installationObjectRepository.GetById(model.Id.Value) : new InstallationObject();
            installationObject.Code = model.Code;
            installationObject.Name = model.Name;
            installationObject.Type = model.Type;
            installationObject.Address = model.Address;
            installationObject.PostalCode = model.PostalCode;
            installationObject.City = model.City;
            installationObject.Country = model.Country;
            installationObject.Note = model.Note;
            installationObject.Status = 0;
            installationObject.OfferCompanyId = model.IOOfferCompanyId;
            if (installationObject.Id == 0)
            {
                installationObjectRepository.Add(installationObject);
            }
            else
            {
                installationObjectRepository.Update(installationObject);
            }
        }

        [HttpGet]
        public IHttpActionResult GetInstallationObject([FromUri]int id)
        {
            try
            {
                InstallationObject installationObject = new InstallationObjectRepository().GetById(id);

                var viewModel = MappingHelper.Mapper.Map<InstallationObjectsViewModel>(installationObject);

                if (installationObject.OfferCompanyId.HasValue)
                {
                    var offerCompany = new OfferCompanyRepository().GetById(installationObject.OfferCompanyId.Value);
                    viewModel.IOOfferCompanyName = offerCompany.Name;
                    viewModel.IOOfferCompanyId = offerCompany.Id;
                }

                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return InternalServerError();
            }

        }

        [HttpGet]
        public InstallationObject GetInstallationObjectDetails([FromUri]int installationObjectId)
        {
            InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
            InstallationObject result = installationObjectRepository.GetById(installationObjectId);

            return result;
        }

        [HttpGet]
        public InstallationObject GetInstallationObjectData(int installationObjectId)
        {
            try
            {
                InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
                InstallationObject installationObject = installationObjectRepository.GetById(installationObjectId);
                return installationObject;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public List<InstallationObjectItemDto> GetInstallationObjectSelectListItems()
        {
            try
            {
                User user = GetLoggedUser();
                InstallationObjectRepository installationObjectRepository = new InstallationObjectRepository();
                List<InstallationObject> installationObjects = null;

                if (User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    installationObjects = installationObjectRepository.GetAll();
                }
                else
                {
                    installationObjects = installationObjectRepository.GetByOwner(user.Id).ToList();
                }
                List<InstallationObjectItemDto> result = installationObjects.Select(c => new InstallationObjectItemDto()
                {
                    Name = c.Name,
                    Id = c.Id,
                    OfferCompanyId = c.OfferCompanyId
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}