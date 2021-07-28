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
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, Products, MarenoOffersAndOrders, HoodOffersAndOrders")]
    public class ApiPersonalProductsController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetPersonalProducts([FromUri]GridParametersDto model)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.GetByLogin(User.Identity.Name);
            PersonalProductRepository personalProductRepository = new PersonalProductRepository();
            GridResultDto result = personalProductRepository.GridGetPersonalProducts(model, user.Id);

            return result;
        }

        [HttpPost]
        public int? DeletePersonalProduct([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                PersonalProductRepository personalProductRepository = new PersonalProductRepository();
                PersonalProduct personalProduct = personalProductRepository.GetById(id);
                personalProduct.IsDeleted = true;
                personalProduct.ModifiedOn = DateTime.Now;
                personalProduct.ModifiedByUserId = loggedUser.Id;
                personalProductRepository.Update(personalProduct);
                return personalProduct.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpPost]
        public int? SavePersonalProduct([FromBody]PersonalProductsViewModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                PersonalProductRepository personalProductRepository = new PersonalProductRepository();
                PersonalProduct personalProduct = model.Id.HasValue ? personalProductRepository.GetById(model.Id.Value) : new PersonalProduct();
                personalProduct.Code = model.Code;
                personalProduct.Name = model.Name;
                personalProduct.Dimensions = model.Dimensions;
                personalProduct.Terminal = model.Terminal;
                personalProduct.PowerGas = model.PowerGas;
                personalProduct.PowerElectricity = model.PowerElectricity;
                personalProduct.PriceNet = model.PriceNet.HasValue ? model.PriceNet.Value : 0;
                personalProduct.Description = model.Description;
                personalProduct.IsDeleted = false;
                personalProduct.ModifiedOn = DateTime.Now;
                personalProduct.ModifiedByUserId = loggedUser.Id;
                if (personalProduct.CreatedByUserId == 0)
                {
                    personalProduct.CreatedByUserId = loggedUser.Id;
                    personalProduct.OwnerUserId = loggedUser.Id;
                    personalProduct.CreatedOn = DateTime.Now;
                }
                if (personalProduct.Id == 0)
                {
                    personalProductRepository.Add(personalProduct);
                }
                else
                {
                    personalProductRepository.Update(personalProduct);
                }

                return personalProduct.Id;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public PersonalProduct GetPersonalProduct([FromUri]int id)
        {
            try
            {
                PersonalProductRepository personalProductRepository = new PersonalProductRepository();
                PersonalProduct personalProduct = personalProductRepository.GetById(id);
                return personalProduct;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }
    }
}
