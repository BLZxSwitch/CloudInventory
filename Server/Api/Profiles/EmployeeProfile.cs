using Api.Transports.Employees;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using System.Linq;

namespace Api.Profiles
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employee, EmployeeDTO>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.SecurityUser.User.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.SecurityUser.User.Email))
                .ForMember(dest => dest.IsInvitationAccepted, opt => opt.MapFrom(src => src.SecurityUser.IsInvitationAccepted))
                .ForMember(dest => dest.IsInvited, opt => opt.MapFrom(src => src.SecurityUser.IsInvited))
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => src.SecurityUser.User.Roles.Any(role => role.RoleId == UserRoles.CompanyAdministrator.RoleId)))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.SecurityUser.IsActive))
                .ReverseMap();

            CreateMap<EmployeeDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForPath(dest => dest.SecurityUser.IsActive, opt => opt.MapFrom(src => src.IsActive))
                .ForPath(dest => dest.SecurityUser.Employee, opt => opt.MapFrom(src => src))
                .ForAllOtherMembers(dest => dest.Ignore());
        }
    }
}
