using Api.Components.Identities;
using Api.Transports.CompanyRegister;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.TermsOfService;

namespace Api.Components.CompanyRegister
{
    [As(typeof(ICompanyRegisterService))]
    class CompanyRegisterService : ICompanyRegisterService
    {
        private readonly ICompanyRegisterRequestToUserConverter _companyRegisterRequestToUserConverter;
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly ICompanyRegisterInternalEmailNotificationService _companyRegisterInternalEmailNotificationService;
        private readonly ICompanyRegisterEmailNotificationService _companyRegisterEmailNotificationService;
        private readonly Func<IInventContext> _contextFactory;
        private readonly IUserToSService _userToSService;

        public CompanyRegisterService(
            Func<IUserManager> userManagerFactory,
            ICompanyRegisterEmailNotificationService companyRegisterEmailNotificationService,
            ICompanyRegisterInternalEmailNotificationService companyRegisterInternalEmailNotificationService,
            ICompanyRegisterRequestToUserConverter companyRegisterRequestToUserConverter,
            Func<IInventContext> contextFactory,
            IUserToSService userToSService)
        {
            _userManagerFactory = userManagerFactory;
            _companyRegisterEmailNotificationService = companyRegisterEmailNotificationService;
            _companyRegisterRequestToUserConverter = companyRegisterRequestToUserConverter;
            _companyRegisterInternalEmailNotificationService = companyRegisterInternalEmailNotificationService;
            _contextFactory = contextFactory;
            _userToSService = userToSService;
        }

        public async Task<Guid> Register(CompanyRegisterRequest request)
        {
            var user =  _companyRegisterRequestToUserConverter.Convert(request);

            using (var context = _contextFactory())
            using (var userManager = _userManagerFactory())
            {
                await userManager.CreateAsync(user, request.Password);

                // TODO that is workarond for usermanager bug. Without it roles are not loaded correctly. That could be fixed in the future
                context.UserRoles.AddRange(
                    new List<UserRole>
                    {
                        new UserRole {Role = await context.Roles.FindAsync(UserRoles.CompanyAdministrator.RoleId), UserId = user.Id},
                        new UserRole {Role = await context.Roles.FindAsync(UserRoles.Employee.RoleId), UserId = user.Id},
                    });

                context.Attach(user);

                await context.SaveChangesAsync();

                await _companyRegisterEmailNotificationService.SendAsync(user);

                await _companyRegisterInternalEmailNotificationService.SendAsync(user);

                await _userToSService.AcceptAsync(user.SecurityUser.Id);

                return user.Id;
            }
        }
    }
}