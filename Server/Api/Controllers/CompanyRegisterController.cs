using Api.Common.Exceptions;
using Api.Components.Captcha;
using Api.Components.CompanyRegister;
using Api.Components.SignIn;
using Api.Filters.ModelStateFilter;
using Api.Transports.CompanyRegister;
using Api.Transports.SignIn;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CompanyRegisterController : Controller
    {
        private readonly ICaptchaValidationService _captchaValidationService;
        private readonly ICompanyRegisterService _companyRegisterService;
        private readonly ISignInResponseProvider _signInResponseProvider;

        public CompanyRegisterController(
            ICaptchaValidationService captchaValidationService,
            ICompanyRegisterService companyRegisterService,
            ISignInResponseProvider signInResponseProvider)
        {
            _captchaValidationService = captchaValidationService;
            _companyRegisterService = companyRegisterService;
            _signInResponseProvider = signInResponseProvider;
        }

        [HttpPost]
        [ModelStateFilter]
        public async Task<SignInResponse> Register([FromBody] CompanyRegisterRequest request)
        {
            var isTokenValid = await _captchaValidationService.IsValidAsync(request.ValidationToken);
            if (!isTokenValid)
                throw new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");

            var userId = await _companyRegisterService.Register(request);

            return await _signInResponseProvider.GetAsync(userId, false);
        }
    }
}