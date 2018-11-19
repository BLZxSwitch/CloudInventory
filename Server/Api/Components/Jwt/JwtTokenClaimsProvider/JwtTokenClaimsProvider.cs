using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Api.Components.GuidsProviders;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.JwtTokenClaimsProvider
{
    [As(typeof(IJwtTokenClaimsProvider))]
    internal class JwtTokenClaimsProvider : IJwtTokenClaimsProvider
    {
        private readonly INewGuidProvider _newGuidProvider;

        public JwtTokenClaimsProvider(INewGuidProvider newGuidProvider)
        {
            _newGuidProvider = newGuidProvider;
        }

        public List<Claim> GetClaims(Guid userId, bool hasLongTimeToLive, IList<string> roles)
        {
            var jtiGuid = _newGuidProvider.Get();
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, jtiGuid.ToString()),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ProjectClaims.JwtTokenHasLongTimeToLiveClaimName, hasLongTimeToLive.ToString())
            }
            .Concat(roles.Select(role => new Claim(ClaimTypes.Role, role)))
            .ToList();
        }
    }
}