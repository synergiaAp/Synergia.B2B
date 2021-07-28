using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public User GetByLoginAndPassword(string login, string password)
        {
            try
            {
                User result = null;
                // string hashedPassword = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(password))).Replace("-", "");
                result = Ctx.CRM_Users.Where(u => u.Login == login && u.IsActive == true && u.IsDeleted == false).SingleOrDefault();
                if (result != null)
                {
                    string hashedPassword = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(password + result.Salt))).Replace("-", "");
                    if (hashedPassword != result.Password)
                    {
                        result = null;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }

        public User GetByLogin(string login)
        {
            try
            {
                User result = null;
                result = Ctx.CRM_Users.Where(u => u.Login == login && u.IsActive == true && u.IsDeleted == false).SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }



        public GridResultDto GridGetUsers(GridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var users = Ctx.pCRM_Users_GridGetUsersList(model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = users,
                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
                };
                return gridResultDto;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }

        }


        public GridResultDto GridGetUsersForCustomer(GridParametersDto model, int customerId)
        {
            try
            {


                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var users = Ctx.pCRM_Customers_GridGetUsersList(customerId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();
                //            var users = Ctx.pCRM_Users_GridGetUsersList(model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                // .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = users,
                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
                };
                return gridResultDto;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }

        }
    }
}
