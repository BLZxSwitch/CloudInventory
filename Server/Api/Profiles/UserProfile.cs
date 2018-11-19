using System.Collections.Generic;
using Api.Transports.Common;
using AutoMapper;
using EF.Models.Models;
using System.Linq;
using Api.Transports.Tenant;

namespace Api.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.SecurityUser.Employee.Id))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.SecurityUser.Employee.FullName))
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles.Select(r => r.Role.Name)))
                .ForMember(dest => dest.UserSettings, opt => opt.MapFrom(src => src.SecurityUser))
                .ReverseMap();

            CreateMap<SecurityUser, UserSettingsDTO>()
                .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.CultureName))
                .ReverseMap()
                .ForMember(dest => dest.TwoFactorAuthenticationSecretKey, opt => opt.Ignore());
        }
    }
}
