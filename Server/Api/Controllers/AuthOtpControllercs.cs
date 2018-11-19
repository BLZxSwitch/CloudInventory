using Api.Common.Exceptions;
using Api.Components.Otp;
using Api.Filters.ModelStateFilter;
using Api.Transports.AuthOtp;
using Api.Transports.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class AuthOtpController : ControllerBase
    {
        private readonly IOtpLinkRequestProvider _otpLinkRequestProvider;
        private readonly IOtpResponseProvider _otpResponseProvider;
        private readonly IOtpActivationRequestParamProvider _otpActivationRequestParamProvider;
        private readonly IOtpDeactivationRequestParamProvider _otpDeactivationRequestParamProvider;
        private readonly IOtpActivationRequestValidationService _otpActivationRequestValidationService;
        private readonly IOtpActivationService _otpActivationService;
        private readonly IOtpDeactivationService _optDeactivationService;

        public AuthOtpController(
            IOtpLinkRequestProvider otpLinkRequestProvider,
            IOtpResponseProvider otpResponseProvider,
            IOtpActivationRequestParamProvider otpActivationRequestParamProvider,
            IOtpDeactivationRequestParamProvider otpDeactivationRequestParamProvider,
            IOtpActivationRequestValidationService otpActivationRequestValidationService,
            IOtpActivationService otpActivationService,
            IOtpDeactivationService optDeactivationService)
        {
            _otpLinkRequestProvider = otpLinkRequestProvider;
            _otpResponseProvider = otpResponseProvider;
            _otpActivationRequestParamProvider = otpActivationRequestParamProvider;
            _otpDeactivationRequestParamProvider = otpDeactivationRequestParamProvider;
            _otpActivationRequestValidationService = otpActivationRequestValidationService;
            _otpActivationService = otpActivationService;
            _optDeactivationService = optDeactivationService;
        }

        public async Task<OtpGetLinkResponse> Get()
        {
            var request = await _otpLinkRequestProvider.GetAsync();
            return _otpResponseProvider.Get(request);
        }

        [HttpPost]
        [ModelStateFilter]
        public async Task<UserSettingsDTO> Activate([FromBody] OtpActivationRequest credentials)
        {
            var activationParams = _otpActivationRequestParamProvider.Get(credentials);
            if (activationParams == null)
            {
                throw new BadRequestException("OTP_INVALID_REQUEST");
            }
            var result = await _otpActivationRequestValidationService.ValidateAsync(activationParams);
            if (result != "VALID")
            {
                throw new BadRequestException(result);
            }
            return await _otpActivationService.ActivateAsync(activationParams);
        }

        [HttpPost]
        [ModelStateFilter]
        public async Task<UserSettingsDTO> Deactivate([FromBody] OtpDeactivationRequest credentials)
        {
            var deactivationParams = await _otpDeactivationRequestParamProvider.GetAsync(credentials);
            if (deactivationParams == null)
            {
                throw new BadRequestException("OTP_INVALID_REQUEST");
            }
            var result = await _otpActivationRequestValidationService.ValidateAsync(deactivationParams);
            if (result != "VALID")
            {
                throw new BadRequestException(result);
            }
            return await _optDeactivationService.DeactivateAsync(deactivationParams);
        }
    }
}
