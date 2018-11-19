using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Api.Components.Jwt.RolesClaimValueProvider
{
    [As(typeof(IRolesClaimValueProvider))]
    public class RolesClaimValueProvider : IRolesClaimValueProvider
    {
        private readonly IOptions<IdentityOptions> _options;
        private readonly ClaimsPrincipal _principal;

        public RolesClaimValueProvider(
            ClaimsPrincipal principal,
            IOptions<IdentityOptions> options)
        {
            _principal = principal;
            _options = options;
        }

        public IList<string> GetValue()
        {
            return _principal.Claims
                .Where(claim => claim.Type == _options.Value.ClaimsIdentity.RoleClaimType)
                .Select(claim => claim.Value)
                .ToList();
        }
    }
}
