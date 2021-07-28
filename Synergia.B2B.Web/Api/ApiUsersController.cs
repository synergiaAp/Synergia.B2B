using Synergia.B2B.Common.Dto.Api.DataTables;
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
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, AdministrationSection")]
    public class ApiUsersController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetUsers([FromUri]GridParametersDto model)
        {
            UserRepository userRepository = new UserRepository();
            GridResultDto result = userRepository.GridGetUsers(model);

            foreach (var user in result.Data as List<pCRM_Users_GridGetUsersList_Result>)
            {
                user.StatusText = user.IsActive ? "Aktywny" : "Nieaktywny";
            }

            return result;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Manager, Seller, Customer")]
        public GridResultDto GridGetUsersForCustomer([FromUri] GridParametersDto model, int customerId)
        {

            User user = GetLoggedUser();
            if (customerId == -1)
            { customerId = user.CustomerId; }
            //customerId = user.CustomerId;
            if (user.Role > 3)
            { customerId = user.CustomerId; }
            UserRepository userRepository = new UserRepository();
            GridResultDto result = userRepository.GridGetUsersForCustomer(model, customerId);
            //GridResultDto result = userRepository.GridGetUsersForCustomer(model, 312);
            //GridResultDto result = userRepository.GridGetUsers(model


            return result;
        }


        [HttpPost]
        public void DeleteUser([FromBody]int id)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.GetById(id);
            user.IsDeleted = true;
            userRepository.Update(user);
        }

        [HttpGet]
        public IHttpActionResult GetUser([FromUri]int id)
        {
            try
            {
                UserRepository userRepository = new UserRepository();
                User user = userRepository.GetById(id);
                UsersViewModel result = MappingHelper.Mapper.Map<UsersViewModel>(user);
                result.Role = new UserRoleRepository().GetByUserId(user.Id)
                    .Select(x => (UserRoleType)x.UserRoleDictId)
                    .ToList();

                Customer customer = new CustomerRepository().GetById(user.CustomerId);
                result.CustomerName = customer.Name;

                return Ok(result);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return InternalServerError();
            }
        }

        [HttpPost]
        public void SaveUser([FromBody]UsersViewModel model)
        {
            UserRepository userRepository = new UserRepository();
            User user = model.Id.HasValue ? userRepository.GetById(model.Id.Value) : new User();
            user.FirstName = model.FirstName;
            user.Surname = model.Surname;
            user.Login = model.Login;
            user.WelcomeText = model.WelcomeText;
            user.Role = model.Role.Min(x => (byte)x);
            user.IsActive = model.IsActive;
            user.BirthdayDate = model.BirthdayDate;
            user.Position = model.Position;
            user.Boss = model.Boss;
            user.RegionId = model.RegionId;
            user.CustomerId = model.CustomerId.Value;
            user.Phone = model.Phone;
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.Salt = Guid.NewGuid().ToString();
                user.Password = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(model.Password + user.Salt))).Replace("-", "");
                user.IsPasswordChangeRequired = true;
                //user.Password = model.Password;
            }

            if (user.Id == 0)
            {
                userRepository.Add(user);
            }
            else
            {
                userRepository.Update(user);
            }

            var userRoleRepository = new UserRoleRepository();
            var existingRoles = userRoleRepository.GetByUserId(user.Id);
            if (model.Role != null)
            {
                foreach (var roleToSave in model.Role)
                {
                    if (!existingRoles.Where(x => (UserRoleType)x.UserRoleDictId == roleToSave).Any())
                    {
                        var newUserRole = new UserRole()
                        {
                            CreatedByUserId = LoggedUserId,
                            CreatedOn = DateTime.Now,
                            UserRoleDictId = (byte)roleToSave,
                            ModifiedByUserId = LoggedUserId,
                            ModifiedOn = DateTime.Now,
                            UserId = user.Id
                        };
                        userRoleRepository.Save(newUserRole);
                    }
                }
            }

            foreach (var itemToRemove in existingRoles.Where(x => model.Role == null
                || !model.Role.Where(y => y == (UserRoleType)x.UserRoleDictId).Any()))
            {
                itemToRemove.IsDeleted = true;
                itemToRemove.ModifiedByUserId = LoggedUserId;
                itemToRemove.ModifiedOn = DateTime.Now;
                userRoleRepository.Update(itemToRemove);
            }
        }
    }
}
