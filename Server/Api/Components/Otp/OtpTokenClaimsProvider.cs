using Api.Components.GuidsProviders;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Api.Components.Otp
{
    [As(typeof(IOtpTokenClaimsProvider))]
    class OtpTokenClaimsProvider : IOtpTokenClaimsProvider
    {
        private readonly INewGuidProvider _newGuidProvider;

        public OtpTokenClaimsProvider(INewGuidProvider newGuidProvider)
        {
            _newGuidProvider = newGuidProvider;
        }

        public List<Claim> GetClaims(Guid userId, string secretKey)
        {
            var jtiGuid = _newGuidProvider.Get();
            return new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, jtiGuid.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ProjectClaims.OtpTokenSecretKeyClaimName, secretKey)
                }
                .ToList();
        }
    }
}