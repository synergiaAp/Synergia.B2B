using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Dto.Api.Offer;
using Synergia.B2B.Common.Dto.Api.Products;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Synergia.B2B.Web.Api
{
    [Authorize(Roles = "Admin, Products, MarenoOffersAndOrders, HoodOffersAndOrders")]
    public class ApiProductsController : ApiBaseController
    {
        [HttpGet]
        public List<GetProductsResultDto> GetProducts([FromUri]GetProductsParametersDto model)
        {
            ProductRepository productRepository = new ProductRepository();
            List<GetProductsResultDto> result = productRepository.GetProducts(model);

            return result;
        }

        [HttpGet]
        public Product GetProductDetails([FromUri]int productId)
        {
            ProductRepository productRepository = new ProductRepository();
            Product result = productRepository.GetById(productId);

            return result;
        }

        [HttpGet]
        [Authorize]
        public string GetProductDetailsPrice([FromUri] int productId)
        {
            User loggedUser = GetLoggedUser();
            ProductRepository productRepository = new ProductRepository();
            //string result = productRepository.GetKHTWPrice(productId,customerId);
            string result = productRepository.GetKHTWPrice(productId, loggedUser.CustomerId);
            decimal res1 = Convert.ToDecimal(result);

            string sCurrency = productRepository.GetKHOrderCurrency(loggedUser.CustomerId);

            decimal fRate = productRepository.GetKHOrderExchangeRateEUR();
            //decimal fRate = Convert.ToDecimal(sRate);

            decimal res2;
            if (sCurrency=="PLN")
            {
                res2 = res1 * fRate;
                res1 = res2;
            }

            //if (isUnpacking)
            //{
            //    if (percSurcharge != 0)
            //    {
            //        res1 = res1 + res1 * percSurcharge / 100;
            //        result = res1.ToString();
            //    }
            //}
            result = res1.ToString();
            return result;
            //return "34";
        }

        [HttpGet]
        [Authorize]
        public string GetProductDetailsCurrency([FromUri] int productId)
        {
            User loggedUser = GetLoggedUser();
            ProductRepository productRepository = new ProductRepository();
            //string result
            //string result = productRepository.GetKHTWCurrency(productId, loggedUser.CustomerId);
            string result = productRepository.GetKHOrderCurrency(loggedUser.CustomerId);

            return result;
            //return "34";
        }



        //do pobierania DataTables
        [HttpGet]
        public GridResultDto GridGetProducts([FromUri]ProductsListGridParametersDto model)
        {
            ProductRepository productRepository = new ProductRepository();
            GridResultDto result = productRepository.GridGetProducts(model);

            return result;
        }

        [HttpGet]
        public GridResultDto GridGetProductDocuments([FromUri]ProductDocumentsListGridParametersDto model)
        {
            ProductDocumentRepository productDocumentRepository = new ProductDocumentRepository();
            GridResultDto result = productDocumentRepository.GridGetProductDocuments(model);

            return result;
        }

        [Authorize]
        [HttpGet]
        public List<SearchProductsForOfferResultDto> SearchProductsForOffer([FromUri]SearchProductsForOfferParametersDto model)
        {
            try
            {
                List<SearchProductsForOfferResultDto> result = new List<SearchProductsForOfferResultDto>();

                ProductRepository productRepository = new ProductRepository();

                if(model.GroupId == 0 || !model.GroupId.HasValue)
                {
                    User loggedUser = GetLoggedUser();

                    List<PersonalProduct> personalProducts = new PersonalProductRepository().SearchProductsForOffer(model.Term,
                        !User.IsInRole(UserRoleType.Admin.ToString()) ? (int?)loggedUser.Id : null);
                    result.AddRange(personalProducts.Select(p => new SearchProductsForOfferResultDto()
                    {
                        Label = $"{p.Code} - {p.Name}",
                        PersonalProductId = p.Id
                    }).ToList());
                }

                if(model.GroupId > 0 || !model.GroupId.HasValue)
                {
                    List<Product> products = productRepository.SearchProductsForOffer(model.Term, model.GroupId);
                    result.AddRange(products.Select(x=> new { x.Id, x.Code, x.Name })
                        .Distinct()
                        .Select(p => new SearchProductsForOfferResultDto()
                        {
                            ProductId = p.Id,
                            Label = $"{p.Code} - {p.Name}"
                        }).Distinct()
                        .ToList());
                }

                result = result.OrderBy(r => r.Label).Take(20).ToList();

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