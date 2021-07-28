using Synergia.B2B.Common.Dto.Api.Common;
using Synergia.B2B.Common.Dto.Api.OfferCompany;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize]
    public class ApiOfferCompaniesController : ApiBaseController
    {
        [HttpGet]
        public List<SearchOfferCompanyResultDto> SearchOfferCompany([FromUri]AutocompleteParametersDto model)
        {
            try
            {
                int? customerId = null;
                if (!User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    customerId = GetLoggedUser().CustomerId;
                }

                List<OfferCompany> offerCompanies = new OfferCompanyRepository().Search(model.Term, customerId);

                List<SearchOfferCompanyResultDto> result = offerCompanies.Select(p => new SearchOfferCompanyResultDto()
                {
                    Label = p.Name,
                    OfferCompanyId = p.Id
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
