using Api.Transports.OrgUnits;
using AutoMapper;
using EF.Models.Models;

namespace Api.Profiles
{
    public class OrgUnitProfile : Profile
    {
        public OrgUnitProfile()
        {
            CreateMap<OrgUnit, OrgUnitDTO>()
                .ReverseMap();

            CreateMap<OrgUnit, OrgUnitResponseDTO>()
                .ForMember(dest => dest.CurrentOrgUnitMOLName, opt => opt.MapFrom(src => src.CurrentOrgUnitMOL.FullName))
                .ReverseMap();

            CreateMap<OrgUnit, OrgUnitRequestDTO>()
                .ReverseMap();
        }
    }
}
