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
    [Authorize(Roles = "Admin, Clients")]
    public class ApiContactsController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetContacts([FromUri]GridParametersDto model)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.GetByLogin(User.Identity.Name);
            ContactRepository contactRepository = new ContactRepository();
            GridResultDto result = contactRepository.GridGetContacts(model, user.Id);

            return result;
        }

        [HttpPost]
        public int? DeleteContact([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();
                ContactRepository contactRepository = new ContactRepository();
                Contact contact = contactRepository.GetById(id);
                contact.IsDeleted = true;
                contact.ModifiedOn = DateTime.Now;
                contact.ModifiedByUserId = loggedUser.Id;
                contactRepository.Update(contact);
                return contact.Id;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
           
        }

        [HttpPost]
        public int? SaveContact([FromBody]ContactsViewModel model)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                ContactRepository contactRepository = new ContactRepository();
                Contact contact = model.Id.HasValue ? contactRepository.GetById(model.Id.Value) : new Contact();
                contact.Attitude = model.Attitude;
                contact.BirthDate = model.BirthDate;
                contact.BirthdayReminder = model.BirthdayReminder;
                contact.Comment = model.Comment;
                contact.CustomerType = model.CustomerType;
                contact.Email = model.Email;
                contact.FirstName = model.FirstName;
                contact.Interests = model.Interests;
                contact.LandlinePhone = model.LandlinePhone;
                contact.LastContact = model.LastContact;
                contact.MobilePhone = model.MobilePhone;
                contact.Position = model.Position;
                contact.Status = model.Status;
                contact.OffersCompanyId = model.OffersCompanyId.Value;
                contact.Surname = model.Surname;
                contact.IsDeleted = false;
                contact.ModifiedOn = DateTime.Now;
                contact.ModifiedByUserId = loggedUser.Id;
                if (contact.CreatedByUserId == 0)
                {
                    contact.CreatedByUserId = loggedUser.Id;
                    contact.OwnerUserId = loggedUser.Id;
                    contact.CreatedOn = DateTime.Now;
                }
                if (contact.Id == 0)
                {
                    contactRepository.Add(contact);
                }
                else
                {
                    contactRepository.Update(contact);
                }

                return contact.Id;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpGet]
        public IHttpActionResult GetContact([FromUri]int id)
        {
            try
            {
                ContactRepository contactRepository = new ContactRepository();
                Contact contact = contactRepository.GetById(id);
                OfferCompany offerCompany = new OfferCompanyRepository().GetById(contact.OffersCompanyId);

                ContactsViewModel result = MappingHelper.Mapper.Map<ContactsViewModel>(contact);
                result.OffersCompanyName = offerCompany.Name;

                return Ok(result);
            }
            catch(Exception ex)
            {
                LogHelper.Log.Error(ex);
                return InternalServerError();
            }
        }
    }
}