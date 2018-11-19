using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.CurrentEmployeeProvider
{
    [As(typeof(ICurrentEmployeeProvider))]
    class CurrentEmployeeProvider : ICurrentEmployeeProvider
    {
        private readonly ICurrentUserProvider _currentUserProvider;

        public CurrentEmployeeProvider(ICurrentUserProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }
        public async Task<Guid> GetEmployeeIdAsync(ClaimsPrincipal claimsPrincipal)
        {
            var user = await _currentUserProvider.GetUserAsync(claimsPrincipal);

            return user.SecurityUser.Employee.Id;
        }
    }
}