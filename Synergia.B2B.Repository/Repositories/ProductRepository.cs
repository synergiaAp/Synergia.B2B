using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Synergia.B2B.Common.Dto.Api.Products;
using Synergia.B2B.Common.Dto.Api.DataTables;
using System.Data.Entity.Core.Objects;

namespace Synergia.B2B.Repository.Repositories
{
    public class ProductRepository : BaseRepository<Product>
    {
        public List<GetProductsResultDto> GetProducts(GetProductsParametersDto model)
        {
            List<GetProductsResultDto> result = new List<GetProductsResultDto>();
            if (string.IsNullOrEmpty(model.Search))
            {
                IQueryable<Group> groupsResult = Ctx.vCRM_Grupy;
                groupsResult = groupsResult.Where(g => g.ParId == model.GroupId);
                result = groupsResult.Select(g => new GetProductsResultDto()
                {
                    Id = g.Id,
                    Code = g.Code,
                    FileName = g.Photo1,
                    IsGroup = true,
                    ParentParentId = g.ParParId
                }).ToList();
            }

            if (!result.Any())
            {
                IQueryable<Product> productsResult = Ctx.vCRM_Produkty;
                if (string.IsNullOrEmpty(model.Search))
                {
                    productsResult = productsResult.Where(p => p.GroupId == model.GroupId);
                }
                else
                {
                    productsResult = productsResult.Where(p => p.Code.Contains(model.Search) );
                }

                result = productsResult.OrderBy(p => p.Code)
                    .Select(x=> new
                    {
                        x.Id,
                        x.Code,
                        x.Photo1,
                        x.Name
                    })
                    .ToList()
                    .Distinct()
                    .ToList()
                    .Select(p => new GetProductsResultDto()
                    {
                        Id = p.Id,
                        Code = p.Code,
                        FileName = p.Photo1,
                        Name = p.Name,
                        ParentParentId = productsResult.Where(x => x.Id == p.Id).First().ParGroupId
                    }).ToList();
            }
            return result;
        }


        public string GetKHTWPrice(int idTW, int idKH)
        {
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            //var result = Ctx.pCRM_GetKHTWPrice(66738,903).SingleOrDefault().ToString();
            var result = Ctx.pCRM_GetKHTWPrice(idTW, idKH).SingleOrDefault().ToString();
            // string priceResult = 88.ToString();
            return result;
        }

        public string GetKHOrderCurrency(int idKH)
        {
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            //var result = Ctx.pCRM_GetKHTWPrice(66738,903).SingleOrDefault().ToString();

            var result = Ctx.pCRM_GetKHOrderCurrency(idKH).SingleOrDefault().ToString();
            // string priceResult = 88.ToString();
            return result;
        }

        public string GetKHTWCurrency(int idTW, int idKH)
        {
            //int idTW2 = idTW;
            //int idKH2 = idKH;
            //idTW = 66738;
            //idKH = 903;
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            var result = Ctx.pCRM_GetKHTWCurrency(idTW, idKH).SingleOrDefault().ToString();
            if (result == "" || result is null)
            {
                result = "PLN";
            }
            // string priceResult = 88.ToString();
            return result;
        }

        public decimal GetKHOrderExchangeRate(string Curr)
        {
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            //var result = Ctx.pCRM_GetKHTWPrice(66738,903).SingleOrDefault().ToString();
            //var result=0;
            decimal result = 0;
            if (Curr == "PLN")
            {
                result = 1;
            }
            else
            {

                result = Convert.ToDecimal(Ctx.pCRM_GetCurrencyCourse(Curr).SingleOrDefault().Value);//.ToString();
            }
            // string priceResult = 88.ToString();
            return result;
        }

        public decimal GetKHOrderExchangeRateEUR()
        {
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            //var result = Ctx.pCRM_GetKHTWPrice(66738,903).SingleOrDefault().ToString();
            //var result=0;
            decimal result = 0;

            result = Convert.ToDecimal(Ctx.pCRM_GetCurrencyCourse("EUR").SingleOrDefault().Value);//.ToString();

            // string priceResult = 88.ToString();
            return result;
        }


        public override Product GetById(int id)
        {
            return Ctx.vCRM_Produkty.Where(p => p.Id == id).FirstOrDefault();
        }

        public GridResultDto GridGetProducts(ProductsListGridParametersDto model)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var products = Ctx.pCRM_Products_GridGetProductsList((byte)model.PairType, model.ParentProductId, model.SearchValue, model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = products,
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

        public List<Product> SearchProductsForOffer(string term, int? groupId)
        {
            try
            {
                List<int> matchedGroupIds = new List<int>();
                if (groupId.HasValue)
                {
                    var allGroups = new GroupRepository().GetAll();
                    matchedGroupIds.Add(groupId.Value);

                    for(int i = 0; i < matchedGroupIds.Count; i++)
                    {
                        matchedGroupIds.AddRange(allGroups.Where(g => g.ParId == matchedGroupIds[i]).Select(g=>g.Id));
                    }
                }

                var result = Ctx.vCRM_Produkty
                    .Where(p => (string.IsNullOrEmpty(term) || p.Code.Contains(term) || p.Name.Contains(term)) 
                        && (!groupId.HasValue || (p.GroupId.HasValue && matchedGroupIds.Contains(p.GroupId.Value))))
                    .OrderBy(p => p.Code)
                    .Take(30)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {

                Log.Error(ex);
                return null;
            }
        }
    }
}
