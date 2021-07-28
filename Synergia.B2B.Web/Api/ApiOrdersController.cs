using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Dto.Api.Offer;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Repository.Services.Mail;
using Synergia.B2B.Repository.Services.Pdf;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, MarenoOffersAndOrders")]
    public class ApiOrdersController : ApiBaseController
    {
        [HttpGet]
        public GridResultDto GridGetOrders([FromUri]GridParametersDto model)
        {
            try
            {
                User user = GetLoggedUser();
                OrderRepository orderRepository = new OrderRepository();
                GridResultDto result = orderRepository.GridGetOrders(model, user.Id);

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpGet]
        public GridResultDto GridGetOrderElements([FromUri]OrderDetailsListGridParametersDto model)
        {
            try
            {
                User user = GetLoggedUser();
                OrderElementRepository orderElementRepository = new OrderElementRepository();
                GridResultDto result = orderElementRepository.GridGetOrderElements(model, user.Id);

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }

        }

        [HttpGet]
        public OrdersViewModel GetOrderData([FromUri]int orderId)
        {
            try
            {
                OrderRepository orderRepository = new OrderRepository();
                Order order = orderRepository.GetById(orderId);
                File fileLogo = order.LogoFileId.HasValue
                    ? new FileRepository().GetById(order.LogoFileId.Value)
                    : null;

                CustomerRepository customerRepository = new CustomerRepository();
                Customer seller = customerRepository.GetById(order.SellerFirmaId);

                OrdersViewModel result = new OrdersViewModel()
                {
                    City = order.City,
                    Logo = fileLogo?.GeneratedFileName,
                    OfferCompanyId = order.CustomerOfferCompanyId,
                    InstallationObjectId = order.InstallationObjectObiektyId,
                    OrderDate = order.OrderDate,
                    OrderNumber = order.OrderNumber,
                    SellerName = seller.Name,
                    SellerFirmaId = order.SellerFirmaId,
                    OrderId = order.Id,
                    CatalogValueNet = order.CatalogValue,
                    FinalValueAfterAllDiscountsNet = order.FinalValueAfterAllDiscounts,
                    ValueAfterPrimatyDiscountNet = order.ValueAfterPrimatyDiscount,
                    StatusText = ((OrderStatus)order.Status).GetDescription(),
                    Status = order.Status.Value,
                    IsPrepayment = order.IsPrepayment,
                };

                return result;
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public bool DeleteOrder([FromBody]int id)
        {
            try
            {
                User loggedUser = GetLoggedUser();

                OrderRepository orderRepository = new OrderRepository();
                Order order = orderRepository.GetById(id);
                order.ModifiedOn = DateTime.Now;
                order.ModifiedByUserId = loggedUser.Id;
                order.IsDeleted = true;
                orderRepository.Update(order);

                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }
    }
}
