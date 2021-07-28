using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    public class ApiBaseController : ApiController
    {
        protected int LoggedUserId
        {
            get
            {
                return int.Parse(((ClaimsIdentity)User.Identity).Claims.FirstOrDefault(x => x.Type == "UserId").Value);
            }
        }

        protected User GetLoggedUser()
        {
            try
            {
                UserRepository userRepository = new UserRepository();
                User user = userRepository.GetByLogin(User.Identity.Name);

                return user;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}
