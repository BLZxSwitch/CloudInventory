using Api.Components.CurrentUserProvider;
using Api.Transports.AuthOtp;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpDeactivationRequestParamProvider))]
    class OtpDeactivationRequestParamProvider : IOtpDeactivationRequestParamProvider
    {
        private readonly IOtpSecretKeyProvider _otpSecretKeyProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICurrentUserProvider _currentUserProvider;

        public OtpDeactivationRequestParamProvider(
            IOtpSecretKeyProvider otpSecretKeyProvider,
            IHttpContextAccessor httpContextAccessor,
            ICurrentUserProvider currentUserProvider)
        {
            _otpSecretKeyProvider = otpSecretKeyProvider;
            _httpContextAccessor = httpContextAccessor;
            _currentUserProvider = currentUserProvider;
        }

        public async Task<OtpActivationRequestParams> GetAsync(OtpDeactivationRequest credentials)
        {
            var principal = _httpContextAccessor.HttpContext.User;
            var user = await _currentUserProvider.GetUserAsync(principal);

            var userId = user.Id;
            var secretKeyBytes = await _otpSecretKeyProvider.ReadAsync(userId);

            return new OtpActivationRequestParams
            {
                UserId = userId,
                SecretKey = secretKeyBytes,
                Otp = credentials.Otp,
                Password = credentials.Password
            };
        }
    }
}