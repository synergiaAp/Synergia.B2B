//using Synergia.B2B.Common.Dto.Api.DataTables;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodOfferRepository : BaseRepository<HoodOffer>
//    {
//        public GridResultDto GridGetOffers(HoodOfferListGridParametersDto model, int userId)
//        {
//            try
//            {
//                GridResultDto gridResultDto = null;
//                ObjectParameter recordsTotalOP = new ObjectParameter("RecordsTotal", typeof(int));

//                var offers = Ctx.pCRM_HoodOffers_GridGetHoodOffersList(userId, model.Statuses, model.SearchValue,
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

//        public int GetNextOfferNumberIndex()
//        {
//            try
//            {
//                var latestOfferNumber = Ctx.CRM_HoodOffers.Where(o => !o.IsDeleted && (HoodOfferStatus)o.Status != HoodOfferStatus.New
//                        && !o.IsManualOfferNumber)
//                    .OrderByDescending(o => o.OfferNumberIndex)
//                    .Select(o => o.OfferNumber)
//                    .FirstOrDefault();
//                int nextNumber = 1;
//                if (!string.IsNullOrEmpty(latestOfferNumber))
//                {
//                    //JE18-5790_1
//                    nextNumber = ParseHelper.ToInt(latestOfferNumber.Substring(latestOfferNumber.IndexOf('-') + 1,
//                        latestOfferNumber.IndexOf('_') - latestOfferNumber.IndexOf('-') - 1)) + 1;
//                }
//                else
//                {
//                    var configuration = new ConfigurationRepository().GetConfiguration();
//                    if (configuration.HoodOfferStartingNumber.HasValue)
//                    {
//                        nextNumber = configuration.HoodOfferStartingNumber.Value;
//                    }
//                }
//                return nextNumber;
//                //return $"JE{DateTime.Today.ToString("yy")}-{nextNumber}_1";
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw ex;
//            }
//        }

//        public string GetNextOfferNumberFromCopy(string copiedOfferNumber)
//        {
//            try
//            {
//                string offerNumberToCompare = copiedOfferNumber.Substring(0, copiedOfferNumber.Length - 1);
//                var latestOfferNumber = Ctx.CRM_HoodOffers.Where(o => !o.IsDeleted && o.OfferNumber.StartsWith(offerNumberToCompare))
//                    //.OrderByDescending(o => o.Id)
//                    .Select(o => o.OfferNumber)
//                    .ToList()
//                    .OrderByDescending(x => ParseHelper.ToInt(x.Substring(x.IndexOf('_') + 1)))
//                    .FirstOrDefault();

//                //JE18-5790_1 -> JE18-5790_2
//                string nextNumber = latestOfferNumber.Substring(0, latestOfferNumber.IndexOf('_') + 1)
//                    + (ParseHelper.ToInt(latestOfferNumber.Substring(latestOfferNumber.IndexOf('_') + 1)) + 1).ToString();
//                return nextNumber;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        public void CalculateHoodOfferPrice(int hoodOfferId)
//        {
//            try
//            {
//                HoodOfferRepository hoodOfferRepository = new HoodOfferRepository();
//                HoodOfferElementRepository hoodOfferElementRepository = new HoodOfferElementRepository();
//                var sumPrice = hoodOfferElementRepository.GetByHoodOfferId(hoodOfferId).Sum(o => o.Quantity * o.FinalPriceSingleElement.GetValueOrDefault(0));

//                var accessories = new HoodOfferAccessoryRepository().GetByHoodOfferId(hoodOfferId);
//                sumPrice += accessories.Sum(x => (decimal?)x.FinalPrice).GetValueOrDefault(0);

//                HoodOffer hoodOffer = hoodOfferRepository.GetById(hoodOfferId);
//                hoodOffer.FinalValue = sumPrice;
//                hoodOfferRepository.Update(hoodOffer);
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//            }
//        }

//        public HoodOffer GetByOfferNumber(string hoodOfferNumber)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOffers.Where(x => x.OfferNumber == hoodOfferNumber && !x.IsDeleted)
//                    .SingleOrDefault();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw ex;
//            }
//        }
//    }
//}
