//using Synergia.B2B.Common.Entities;
//using Synergia.B2B.Common.Enums;
//using Synergia.B2B.Common.Helpers;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Synergia.B2B.Repository.Repositories
//{
//    public class HoodOfferAccessoryRepository : BaseRepository<HoodOfferAccessory>
//    {
//        public HoodOfferAccessory GetByTypeAndName(byte type, string name, int hoodOfferId)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOfferAccessories.Where(x => !x.IsDeleted && x.HoodOfferId == hoodOfferId && x.Type == type
//                    && x.Name == name).SingleOrDefault();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }

//        public List<HoodOfferAccessory> GetByHoodOfferId(int hoodOfferId)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOfferAccessories.Where(x => !x.IsDeleted && x.HoodOfferId == hoodOfferId)
//                    .OrderBy(x => x.Name)
//                    .ToList();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }

//        public List<HoodOfferAccessory> GetByHoodOfferElementId(int hoodOfferElementId)
//        {
//            return GetByHoodOfferElementId(hoodOfferElementId, null);
//        }

//        public List<HoodOfferAccessory> GetByHoodOfferElementId(int hoodOfferElementId, HoodOfferAccessoryType? type)
//        {
//            try
//            {
//                var result = Ctx.CRM_HoodOfferAccessories.Where(x => !x.IsDeleted && x.HoodOfferElementId == hoodOfferElementId
//                        && (!type.HasValue || x.Type == (byte?)type))
//                    .OrderBy(x => x.Name)
//                    .ToList();
//                return result;
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Log.Error(ex);
//                throw;
//            }
//        }
//    }
//}
