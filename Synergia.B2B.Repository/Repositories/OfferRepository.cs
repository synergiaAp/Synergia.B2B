using Synergia.B2B.Common.Dto.Api.DataTables;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Synergia.B2B.Repository.Repositories
{
    public class OfferRepository : BaseRepository<Offer>
    {
        public GridResultDto GridGetOffers(OffersListGridParametersDto model, int userId)
        {
            try
            {
                GridResultDto gridResultDto = null;
                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

                var offers = Ctx.pCRM_Offers_GridGetOffersList(userId, model.Status.ToByteN(), model.SearchValue, 
                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
                    .ToList();

                gridResultDto = new GridResultDto(model)
                {
                    Data = offers,
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

        public string GetKHOrderCurrency(int idKH)
        {
            //List<pCRM_GetKHTWPrice_Result> StringList = new List<pCRM_GetKHTWPrice_Result>();           
            //var result = Ctx.pCRM_GetKHTWPrice(66738,903).SingleOrDefault().ToString();

            var result = Ctx.pCRM_GetKHOrderCurrency(idKH).SingleOrDefault().ToString();
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

        //public string GetNextOfferNumber(int customerId)
        //{
        //    try
        //    {
        //        Offer latestOffer = Ctx.CRM_Offers.Where(o => o.SellerFirmaId == customerId && o.IsDeleted == false).OrderByDescending(o => o.Id).FirstOrDefault();
        //        string result = 1.ToString("D6");
        //        if (latestOffer != null)
        //        {
        //            result = (ParseHelper.ToInt(latestOffer.OfferNumber) + 1).ToString("D6");
        //        }

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        LogHelper.Log.Error(ex);
        //        return null;
        //    }
        //}

        public string GetNextOfferNumber(int customerId)
        {
            try
            {
                var latestOffer = Ctx.CRM_Offers.Where(o => o.SellerFirmaId == customerId && o.IsDeleted == false
                    && (o.OfferNumber.Contains("_1") || !o.OfferNumber.Contains("_")))
                    .OrderByDescending(o => o.Id)
                    .FirstOrDefault();
                string result = 1.ToString("D6");
                if (latestOffer != null)
                {
                    string latestOfferNumber = latestOffer.OfferNumber;
                    if (latestOfferNumber.Contains("_"))
                    {
                        latestOfferNumber = latestOfferNumber.Substring(0, latestOfferNumber.IndexOf("_"));
                    }
                    result = (ParseHelper.ToInt(latestOfferNumber) + 1).ToString("D6");
                }

                return $"{result}_1";
            }
            catch (Exception ex)
            {

                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public string GetNextOfferNumberFromCopy(int customerId, string copiedOfferNumber)
        {
            try
            {
                string offerNumberToCompare = copiedOfferNumber;
                if (offerNumberToCompare.Contains("_"))
                {
                    offerNumberToCompare = offerNumberToCompare.Substring(0, offerNumberToCompare.IndexOf("_"));
                }
                var latestOfferVersion = Ctx.CRM_Offers.Where(o => !o.IsDeleted && o.OfferNumber.StartsWith(offerNumberToCompare) && o.SellerFirmaId == customerId)
                    .Select(x => x.OfferNumber)
                    .ToList()
                    .Select(x => x.Contains("_") ? ParseHelper.ToInt(x.Substring(x.IndexOf('_') + 1)) : 0)
                    .OrderByDescending(x => x)
                    .FirstOrDefault();

                string nextNumber = $"{offerNumberToCompare}_{latestOfferVersion + 1}";
                return nextNumber;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }


        public bool? ExistsByOfferCompanyId(int offerCompanyId)
        {
            try
            {
                bool result = Ctx.CRM_Offers.Where(o => !o.IsDeleted && o.CustomerOfferCompanyId == offerCompanyId).Any();
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
