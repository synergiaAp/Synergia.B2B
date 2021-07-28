using AutoMapper;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class MappingHelper
    {
        public static MapperConfiguration MapperConfig { get; set; }
        public static IMapper Mapper
        {
            get
            {
                return MapperConfig.CreateMapper();
            }
        }

        //public static void RegisterMappings()
        //{
        //    MapperConfig = new MapperConfiguration(cfg =>
        //    {
        //        cfg.CreateMissingTypeMaps = true;
        //        cfg.ValidateInlineMaps = false;

        //        cfg.CreateMap<HoodOfferElementLayoutType?, byte?>().ConvertUsing(src => (byte?)src);
        //        cfg.CreateMap<byte?, HoodOfferElementLayoutType?>().ConvertUsing(src => (HoodOfferElementLayoutType?)src);
        //        cfg.CreateMap<byte, UserRole>().ConvertUsing(src => (UserRole)src);
        //        cfg.CreateMap<HoodFinalOffer, HoodFinalOffer>()
        //            .ForMember(dest => dest.Id, opt => opt.Ignore());
        //        cfg.CreateMap<HoodFinalOfferElement, HoodFinalOfferElement>()
        //            .ForMember(dest => dest.Id, opt => opt.Ignore());
        //        cfg.CreateMap<InstallationObject, InstallationObjectsViewModel>()
        //            .ForMember(dest => dest.Id, opt => opt.Ignore());
        //    });
        //}
    }
}
