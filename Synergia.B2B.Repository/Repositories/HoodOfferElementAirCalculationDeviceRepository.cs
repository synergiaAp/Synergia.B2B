//using Synergia.B2B.Common.Dto.Api.HoodOffer;
//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using System.Transactions;
//using System.Data.Entity;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodOfferElementAirCalculationDeviceRepository : BaseRepository<HoodOfferElementAirCalculationDevice>
//    {
//        public List<HoodOfferElementAirCalculationDevice> GetByHoodOfferElementId(int hoodOfferElementId)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOfferElementAirCalculationDevices.Where(x => !x.IsDeleted && x.HoodOfferElementId == hoodOfferElementId)
//                    .ToList();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        public List<HoodOfferElementAirCalculationDevice> GetByHoodOfferId(int hoodOfferId)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOfferElementAirCalculationDevices
//                    .Include(x => x.CRM_HoodOfferAirCalculationDevices)
//                    .Where(x => !x.IsDeleted && x.CRM_HoodOfferElements.HoodOfferId == hoodOfferId)
//                    .ToList();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return null;
//            }
//        }

//        public bool Save(GetHoodOfferElementAirCalculationDevicesResultDto model, int userId)
//        {
//            try
//            {
//                using (TransactionScope tran = CreateTransaction())
//                {
//                    DateTime now = DateTime.Now;

//                    var existingItems = GetByHoodOfferElementId(model.HoodOfferElementId);
//                    foreach (var item in model.Elements)
//                    {
//                        HoodOfferElementAirCalculationDevice itemToSave = existingItems.Where(x => x.OrderNo == item.OrderNo).SingleOrDefault();
//                        if (itemToSave == null)
//                        {
//                            itemToSave = new HoodOfferElementAirCalculationDevice()
//                            {
//                                CreatedByUserId = userId,
//                                CreatedOn = now,
//                                HoodOfferElementId = model.HoodOfferElementId,
//                                OwnerUserId = userId
//                            };
//                        }
//                        itemToSave.ModifiedByUserId = userId;
//                        itemToSave.ModifiedOn = now;
//                        MappingHelper.Mapper.Map(item, itemToSave);
//                        Save(itemToSave);
//                    }

//                    tran.Complete();
//                }

//                return true;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                return false;
//            }
//        }
//    }
//}
