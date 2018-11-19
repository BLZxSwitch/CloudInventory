using System;
using System.Linq;
using System.Security.Claims;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Api.Components.Jwt.UserIdClaimValueProvider
{
    [As(typeof(IUserIdClaimValueProvider))]
    internal class UserIdClaimValueProvider : IUserIdClaimValueProvider
    {
        private readonly IOptions<IdentityOptions> _options;
        private readonly ClaimsPrincipal _principal;

        public UserIdClaimValueProvider(
            ClaimsPrincipal principal,
            IOptions<IdentityOptions> options)
        {
            _principal = principal;
            _options = options;
        }

        public Guid GetValue()
        {
            var userIdClaim = _principal.Claims
                .Single(claim => claim.Type == _options.Value.ClaimsIdentity.UserIdClaimType);

            return Guid.Parse(userIdClaim.Value);
        }
    }
}