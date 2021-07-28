using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
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
    [Authorize(Roles = "Admin, Documents")]
    public class ApiDocumentsController : ApiController
    {
        [HttpGet]
        public GridResultDto GridGetInvoices([FromUri]GridParametersDto model)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.GetByLogin(User.Identity.Name);
            InvoiceRepository invoiceRepository = new InvoiceRepository();
            GridResultDto result = invoiceRepository.GridGetInvoices(model, user.Id);

            return result;
        }

        [HttpGet]
        public GridResultDto GridGetWZDocs([FromUri]GridParametersDto model)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.GetByLogin(User.Identity.Name);
            WZDocRepository wzDocRepository = new WZDocRepository();
            GridResultDto result = wzDocRepository.GridGetWZDocs(model, user.Id);

            return result;
        }
    }
}