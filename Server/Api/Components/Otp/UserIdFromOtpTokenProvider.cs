using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System.Security.Claims;
using Api.Common.Exceptions;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenValidationParametersProvider;

namespace Api.Components.Otp
{
    [As(typeof(IUserIdFromOtpTokenProvider))]
    class UserIdFromOtpTokenProvider : IUserIdFromOtpTokenProvider
    {
        private readonly IJwtSecurityTokenValidator _jwtSecurityTokenValidator;
        private readonly ITokenValidationParametersProvider _tokenValidationParametersProvider;

        public UserIdFromOtpTokenProvider(
            IJwtSecurityTokenValidator jwtSecurityTokenValidator,
            ITokenValidationParametersProvider tokenValidationParametersProvider)
        {
            _jwtSecurityTokenValidator = jwtSecurityTokenValidator;
            _tokenValidationParametersProvider = tokenValidationParametersProvider;
        }

        public Guid Get(string token)
        {
            var claimsPrincipal = _jwtSecurityTokenValidator.Validate(token, _tokenValidationParametersProvider.GetParameters());

            if (claimsPrincipal.FindFirst(ProjectClaims.OtpAuthTokenClaimName) == null)
            {
                throw new BadRequestException("INVALID_OTP_TOKEN");
            }

            return new Guid(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}