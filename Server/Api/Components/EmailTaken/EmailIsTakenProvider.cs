using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.Employees;
using Api.Components.Identities;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.EmailTaken
{
    [As(typeof(IEmailIsTakenProvider))]
    internal class EmailIsTakenProvider : IEmailIsTakenProvider
    {
        private readonly IUserManager _userManager;

        public EmailIsTakenProvider(IUserManager userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> IsTaken(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        public async Task<bool> IsTaken(string email, Guid selfEmployeeId)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user != null && selfEmployeeId != user.SecurityUser.Employee.Id;
        }
    }
}
