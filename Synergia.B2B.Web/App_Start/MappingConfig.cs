using AutoMapper;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web
{
    public static class MappingConfig
    {
        public static void RegisterMappings()
        {
            MappingHelper.MapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMissingTypeMaps = true;
                cfg.ValidateInlineMaps = false;

                //cfg.CreateMap<HoodOfferElementLayoutType?, byte?>().ConvertUsing(src => (byte?)src);
                //cfg.CreateMap<byte?, HoodOfferElementLayoutType?>().ConvertUsing(src => (HoodOfferElementLayoutType?)src);
                cfg.CreateMap<byte, UserRoleType>().ConvertUsing(src => (UserRoleType)src);
                //cfg.CreateMap<HoodFinalOffer, HoodFinalOffer>()
                //    .ForMember(dest => dest.Id, opt => opt.Ignore());
                //cfg.CreateMap<HoodFinalOfferElement, HoodFinalOfferElement>()
                //    .ForMember(dest => dest.Id, opt => opt.Ignore());
            });
        }
    }
}