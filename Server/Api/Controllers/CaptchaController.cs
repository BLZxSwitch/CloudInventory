using Api.Components.Captcha;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class CaptchaController : ControllerBase
    {
        private readonly CaptchaOptions _captchaOptions;

        public CaptchaController(IOptions<CaptchaOptions> captchaOptions)
        {
            _captchaOptions = captchaOptions.Value;
        }

        public string Get()
        {
            return _captchaOptions.ClientKey;
        }
    }
}
