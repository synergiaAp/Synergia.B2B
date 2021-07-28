using Synergia.B2B.Common.Dto.Api.Common;
using Synergia.B2B.Common.Dto.Api.Customers;
using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Dto.Api.InstallationObject;
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
    [Authorize(Roles = "Admin, Clients")]
    public class ApiCustomersController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetCustomers([FromUri]CustomersListGridParametersDto model)
        {
            try
            {
                CustomerRepository customerRepository = new CustomerRepository();
                GridResultDto result = customerRepository.GridGetCustomers(model);

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        [Authorize]
        public Customer GetCustomerDetailsForLoggedUser()
        {
            User user = GetLoggedUser();
            CustomerRepository customerRepository = new CustomerRepository();
            //Customer result = customerRepository.GetById(312);
            Customer result = customerRepository.GetById(user.CustomerId);

            return result;
        }

        [HttpGet]
        [Authorize] //(Roles = "Admin, Manager, Seller")]
        public Customer GetCustomerDetailsByCustomerId(int customerId)
        {
            User user = GetLoggedUser();
            if (user.Role > 3)
            { customerId = user.CustomerId; }

            CustomerRepository customerRepository = new CustomerRepository();
            Customer result = customerRepository.GetById(customerId);

            return result;
        }




        [HttpGet]
        public IHttpActionResult GetOfferCompanyData(int offerCompanyId)
        {
            try
            {
                OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                OfferCompany offerCompany = offerCompanyRepository.GetById(offerCompanyId);

                CustomersViewModel result = MappingHelper.Mapper.Map<CustomersViewModel>(offerCompany);
                result.CustomerType = new OfferCompanyCustomerTypeRepository().GetByOfferCompanyId(offerCompanyId)
                    .Select(x => x.CustomerTypeId)
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return InternalServerError();
            }
        }

        [HttpGet]
        public List<System.Web.Mvc.SelectListItem> GetOfferCompanySelectListItems()
        {
            try
            {
                User user = GetLoggedUser();
                OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                List<OfferCompany> offerCompanies = null;
                if (User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    offerCompanies = offerCompanyRepository.GetAll();
                }
                else
                {
                    offerCompanies = offerCompanyRepository.GetByOwner(user.Id).ToList();
                }

                List<System.Web.Mvc.SelectListItem> result = offerCompanies.Select(c => new System.Web.Mvc.SelectListItem()
                {
                    Text = c.Name,
                    Value = c.Id.ToString()
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public int? DeleteOfferCompany([FromBody]int id)
        {
            try
            {
                User user = GetLoggedUser();
                OfferRepository offerRepository = new OfferRepository();
                bool? existsByOfferCompanyId = offerRepository.ExistsByOfferCompanyId(id);
                if (existsByOfferCompanyId == false)
                {
                    OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                    OfferCompany offerCompany = offerCompanyRepository.GetById(id);
                    offerCompany.IsDeleted = true;
                    offerCompany.ModifiedOn = DateTime.Now;
                    offerCompany.ModifiedByUserId = user.Id;
                    offerCompanyRepository.Update(offerCompany);
                    return offerCompany.Id;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public int? SaveOfferCompany([FromBody]CustomersViewModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                OfferCompanyRepository offerCompanyRepository = new OfferCompanyRepository();
                OfferCompany offerCompany = model.Id.HasValue ? offerCompanyRepository.GetById(model.Id.Value) : new OfferCompany();
                offerCompany.Address = model.Address;
                offerCompany.Challenge = model.Challenge;
                offerCompany.City = model.City;
                //offerCompany.CustomerType = model.CustomerType;
                offerCompany.DeliveredMaterials = model.DeliveredMaterials;
                offerCompany.Discription = model.Discription;
                offerCompany.LastContact = model.LastContact;
                offerCompany.Name = model.Name;
                offerCompany.NIP = model.NIP;
                offerCompany.PostalCode = model.PostalCode;
                offerCompany.StartYear = model.StartYear;
                offerCompany.Status = model.Status;
                offerCompany.IsDeleted = false;
                offerCompany.ModifiedOn = DateTime.Now;
                offerCompany.ModifiedByUserId = loggedUser.Id;
                if (offerCompany.CreatedByUserId == 0)
                {
                    offerCompany.CreatedByUserId = loggedUser.Id;
                    offerCompany.OwnerUserId = loggedUser.Id;
                    offerCompany.CreatedOn = DateTime.Now;
                }
                if (offerCompany.Id == 0)
                {
                    offerCompanyRepository.Add(offerCompany);
                }
                else
                {
                    offerCompanyRepository.Update(offerCompany);
                }

                OfferCompanyCustomerTypeRepository offerCompanyCustomerTypeRepository = new OfferCompanyCustomerTypeRepository();

                var existingOfferCompanyCustomerTypes = offerCompanyCustomerTypeRepository.GetByOfferCompanyId(offerCompany.Id);
                if (model.CustomerType != null)
                {
                    foreach (var customerTypeToSave in model.CustomerType)
                    {
                        if (!existingOfferCompanyCustomerTypes.Where(x => x.CustomerTypeId == customerTypeToSave).Any())
                        {
                            OfferCompanyCustomerType offerCompanyCustomerType = new OfferCompanyCustomerType()
                            {
                                CreatedByUserId = LoggedUserId,
                                CreatedOn = DateTime.Now,
                                CustomerTypeId = customerTypeToSave,
                                ModifiedByUserId = LoggedUserId,
                                ModifiedOn = DateTime.Now,
                                OfferCompanyId = offerCompany.Id,
                                OwnerUserId = LoggedUserId
                            };
                            offerCompanyCustomerTypeRepository.Save(offerCompanyCustomerType);
                        }
                    }
                }

                foreach (var itemToRemove in existingOfferCompanyCustomerTypes.Where(x => model.CustomerType == null
                    || !model.CustomerType.Where(y => y == x.CustomerTypeId).Any()))
                {
                    itemToRemove.IsDeleted = true;
                    offerCompanyCustomerTypeRepository.Update(itemToRemove);
                }


                return offerCompany.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public List<SearchCustomerResultDto> SearchCustomer([FromUri]AutocompleteParametersDto model)
        {
            try
            {
                List<Customer> customers = new CustomerRepository().Search(model.Term);
                List<SearchCustomerResultDto> result = customers.Select(x => new SearchCustomerResultDto()
                {
                    Label = x.Name,
                    CustomerId = x.id
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