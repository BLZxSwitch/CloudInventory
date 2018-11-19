using Api.Components.GuidsProviders;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Api.Components.Otp
{
    [As(typeof(IOtpAuthTokenClaimsProvider))]
    class OtpAuthTokenClaimsProvider : IOtpAuthTokenClaimsProvider
    {
        private readonly INewGuidProvider _newGuidProvider;

        public OtpAuthTokenClaimsProvider(INewGuidProvider newGuidProvider)
        {
            _newGuidProvider = newGuidProvider;
        }

        public List<Claim> GetClaims(Guid userId)
        {
            var jtiGuid = _newGuidProvider.Get();
            return new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, jtiGuid.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ProjectClaims.OtpAuthTokenClaimName, "")
                }
                .ToList();
        }
    }
}