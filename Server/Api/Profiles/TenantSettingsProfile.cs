using Api.Transports.Tenant;
using AutoMapper;
using EF.Models.Models;

namespace Api.Profiles
{
    public class TenantSettingsProfile : Profile
    {
        public TenantSettingsProfile()
        {
            CreateMap<TenantSettings, TenantSettingsDTO>()
                .ReverseMap();
        }
    }
}
