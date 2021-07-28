//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using System.Web;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodFinalOfferRepository : BaseRepository<HoodFinalOffer>
//    {
//        public GridResultDto GridGetHoodFinalOffers(HoodFinalOfferListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var offers = Ctx.pCRM_HoodFinalOffers_GridGetHoodFinalOffersList(userId, model.Status.ToByteN(), model.SearchValue,
//                        model.OrderColumnNo, model.OrderDirection, model.Start, model.Length, recordsTotalOP)
//                    .ToList();

//                gridResultDto = new GridResultDto(model)
//                {
//                    Data = offers,
//                    RecordsFiltered = int.Parse(recordsTotalOP.Value.ToString()),
//                    RecordsTotal = int.Parse(recordsTotalOP.Value.ToString())
//                };
//                return gridResultDto;
//            }
//            catch (Exception ex)
//            {

//                Log.Error(ex);
//                return null;
//            }
//        }

//        public string GetNextHoodFinalOfferNumber(int hoodOfferId)
//        {
//            try
//            {
//                HoodFinalOffer latestOffer = Ctx.CRM_HoodFinalOffers.Where(o => o.IsDeleted == false && o.HoodOffersId == hoodOfferId)
//                    .OrderByDescending(o => o.Id)
//                    .FirstOrDefault();
//                if (latestOffer != null)
//                {
//                    return GetNextHoodFinalOfferNumberFromCopy(latestOffer.OfferNumber);
//                }
//                else
//                {
//                    latestOffer = Ctx.CRM_HoodFinalOffers.Where(o => o.IsDeleted == false)
//                        .OrderByDescending(o => o.OfferNumber)
//                        .FirstOrDefault();

//                    string result = 1.ToString("D5");
//                    if (latestOffer != null)
//                    {
//                        string latestOfferNumber = latestOffer.OfferNumber;
//                        if (latestOfferNumber.Contains("_"))
//                        {
//                            latestOfferNumber = latestOfferNumber.Substring(0, latestOfferNumber.IndexOf("_"));
//                        }
//                        result = (ParseHelper.ToInt(latestOfferNumber) + 1).ToString("D5");
//                    }
//                    else
//                    {
//                        var configuration = new ConfigurationRepository().GetConfiguration();
//                        if (configuration.HoodFinalOfferStartingNumber.HasValue)
//                        {
//                            result = configuration.HoodFinalOfferStartingNumber.Value.ToString("D5");
//                        }
//                    }
//                    return $"{result}_1";
//                }
//            }
//            catch (Exception ex)
//            {

//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        public string GetNextHoodFinalOfferNumberFromCopy(string copiedHoodFinalOfferNumber)
//        {
//            try
//            {
//                string offerNumberToCompare = copiedHoodFinalOfferNumber;
//                if (offerNumberToCompare.Contains("_"))
//                {
//                    offerNumberToCompare = offerNumberToCompare.Substring(0, offerNumberToCompare.IndexOf("_"));
//                }
//                var latestOfferVersion = Ctx.CRM_HoodFinalOffers.Where(o => !o.IsDeleted && o.OfferNumber.StartsWith(offerNumberToCompare))
//                    .Select(x => x.OfferNumber)
//                    .ToList()
//                    .Select(x => x.Contains("_") ? ParseHelper.ToInt(x.Substring(x.IndexOf('_') + 1)) : 0)
//                    .OrderByDescending(x => x)
//                    .FirstOrDefault();

//                string nextNumber = $"{offerNumberToCompare}_{latestOfferVersion + 1}";
//                return nextNumber;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        public bool? ExistsByHoodFinalOfferCompanyId(int offerCompanyId)
//        {
//            try
//            {
//                bool result = Ctx.CRM_HoodFinalOffers.Where(o => !o.IsDeleted && o.CustomerOfferCompanyId == offerCompanyId).Any();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }
//    }
//}

