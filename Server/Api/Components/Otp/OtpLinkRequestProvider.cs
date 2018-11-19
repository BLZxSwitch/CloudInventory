using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpLinkRequestProvider))]
    class OtpLinkRequestProvider : IOtpLinkRequestProvider
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ICurrentUserProvider _currentUserProvider;
        private readonly AuthOtpOptions _options;

        public OtpLinkRequestProvider(
            IOptions<AuthOtpOptions> options,
            IHttpContextAccessor contextAccessor,
            ICurrentUserProvider currentUserProvider)
        {
            _contextAccessor = contextAccessor;
            _currentUserProvider = currentUserProvider;
            _options = options.Value;
        }

        public async Task<OtpLinkRequest> GetAsync()
        {
            var user = await _currentUserProvider.GetUserAsync(_contextAccessor.HttpContext.User);

            return new OtpLinkRequest
            {
                IssuerName = _options.IssuerName,
                UserEmail = user.Email,
                UserId = user.Id
            };
        }
    }
}