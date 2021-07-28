using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace Synergia.B2B.Web.Controllers
{
    public class LoginController : Controller
    {
        private UserRepository userRepository = new UserRepository();
        private UserRoleRepository userRoleRepository = new UserRoleRepository();

        private IAuthenticationManager Authentication
        {
            get { return HttpContext.GetOwinContext().Authentication; }
        }

        // GET: Login
        public ActionResult Index(string returnUrl)
        {
            if (Request.IsAuthenticated)
            {
                if (User.IsInRole(UserRoleType.Admin.ToString()))
                {
                    return RedirectToAction("CustomerDetails", "Customers");
                }
                //else if (User.IsInRole(UserRoleType.PlansAndReports.ToString()))
                //{
                //    return RedirectToAction("Index", "MonthlyReports");
                //}
                //else if (User.IsInRole(UserRoleType.Products.ToString()))
                //{
                //    return RedirectToAction("Index", "Products");
                //}
                //else if (User.IsInRole(UserRoleType.Clients.ToString()))
                //{
                //    return RedirectToAction("Index", "Customers");
                //}
                //else if (User.IsInRole(UserRoleType.MarenoOffersAndOrders.ToString()))
                //{
                //    return RedirectToAction("Index", "Offers");
                //}
                //else if (User.IsInRole(UserRoleType.HoodSelection.ToString()))
                //{
                //    return RedirectToAction("HoodSelectionOfferList", "HoodSelection");
                //}
                //else if (User.IsInRole(UserRoleType.Documents.ToString()))
                //{
                //    return RedirectToAction("GetInvoices", "Documents");
                //}
                //else if (User.IsInRole(UserRoleType.ManagerSection.ToString()))
                //{
                //    return RedirectToAction("Index", "SubmittedPlans");
                //}
                //else if (User.IsInRole(UserRoleType.AdministrationSection.ToString()))
                //{
                //    return RedirectToAction("Index", "Users");
                //}
                else
                {
                    return RedirectToAction("CustomerDetails", "Customers");
                }
            }
            else
            {
                ViewBag.ReturnUrl = returnUrl;
                return View();
            }
        }

        public ActionResult ChangePassword()
        {
            if (Request.IsAuthenticated)
            {
                return RedirectToAction("CustomerDetails", "Customers");
            }
            else if (!SessionHelper.ChangePasswordUserId.HasValue)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordViewModel model)
        {
            try
            {
                User user = userRepository.GetById(SessionHelper.ChangePasswordUserId.Value);
                user.Salt = Guid.NewGuid().ToString();
                user.Password = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(model.Password + user.Salt))).Replace("-", "");
                user.IsPasswordChangeRequired = false;
                userRepository.Update(user);

                var userRoles = userRoleRepository.GetByUserId(user.Id);

                SessionHelper.ChangePasswordUserId = null;
                return LoginUser(user, userRoles, false, null);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return View(model);
            }
        }

        [HttpPost]
        public ActionResult SignIn(LoginViewModel loginViewModel, string returnUrl)
        {
            User user = userRepository.GetByLoginAndPassword(loginViewModel.Username, loginViewModel.Password);
            if (user != null)
            {
                var userRoles = userRoleRepository.GetByUserId(user.Id);

                return LoginUser(user, userRoles, loginViewModel.RememberMe, returnUrl);
            }
            else
            {
                ModelState.AddModelError("", "Niepoprawny Login lub hasło");
                return View("Index", loginViewModel);
            }
        }

        private ActionResult LoginUser(User user, List<UserRole> userRoles, bool rememberMe, string returnUrl)
        {
            if (user.IsPasswordChangeRequired)
            {
                SessionHelper.ChangePasswordUserId = user.Id;
                return RedirectToAction("ChangePassword", "Login");
            }

            var identity = new ClaimsIdentity(new[] {
                            new Claim(ClaimTypes.Name, user.Login),
                            new Claim(ClaimTypes.NameIdentifier, user.Login),
                            new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "ASP.NET Identity", "http://www.w3.org/2001/XMLSchema#string"),
                            //new Claim(ClaimTypes.Role, ((UserRoleType)user.Role).ToString()),
                            new Claim("UserId", user.Id.ToString()),
                        },
                        DefaultAuthenticationTypes.ApplicationCookie);

            foreach (var userRole in userRoles)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, ((UserRoleType)userRole.UserRoleDictId).ToString()));
            }

            Authentication.SignIn(new AuthenticationProperties
            {
                IsPersistent = false,
                ExpiresUtc = rememberMe == true ? (DateTime?)DateTime.UtcNow.AddDays(7) : null,
            }, identity);

            SCRepository sCRepository = new SCRepository();
            IEnumerable<SC> sCList = sCRepository.GetAll();
            SessionHelper.SCList = sCList;

            SessionHelper.LoggedUser = user;

            ConfigurationRepository configurationRepository = new ConfigurationRepository();
            Configuration configuration = configurationRepository.GetConfiguration();
            SessionHelper.BirthdayTextSmall = configuration.SmallBirthdayText;
            SessionHelper.BirthdayTextBig = configuration.BigBirthdayText;
            SessionHelper.ContactBirthdayReminderItems = new ContactRepository().GetToBirthdayReminder(user.Id);
            if (configuration != null && (string.IsNullOrEmpty(user.WelcomeText) || configuration.OverrideUserWelcomeText))
            {
                SessionHelper.WelcomeText = configuration.WelcomeText;
            }
            else
            {
                SessionHelper.WelcomeText = user.WelcomeText;
            }

            return RedirectToAction("CustomerDetails", "Customers");

            //if (!string.IsNullOrEmpty(returnUrl))
            //{
            //    return Redirect(returnUrl);
            //}
            //else if (User.IsInRole(UserRoleType.HoodOffersAndOrders.ToString()))
            //{
            //    return RedirectToAction("HoodSelectionOfferList", "HoodSelection");
            //}
            //else if (User.IsInRole(UserRoleType.PlansAndReports.ToString()))
            //{
            //    return RedirectToAction("Index", "MonthlyReports");
            //}
            //else
            //{
            //    return RedirectToAction("Index", "Products");
            //}
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult SignOut()
        {
            Authentication.SignOut();
            Session.Abandon();
            if (Request.Cookies["ActiveOfferId"] != null)
            {
                Response.Cookies["ActiveOfferId"].Expires = DateTime.Today.AddDays(-1);
            }
            return RedirectToAction("Index", "Login");
        }
    }
}