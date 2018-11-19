using Api.Components.HttpClient;
using Api.Components.NowProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Api.Components.Captcha
{
    [As(typeof(ICaptchaValidationService))]
    class CaptchaValidationService : ICaptchaValidationService
    {
        private readonly CaptchaOptions _options;
        private readonly INowProvider _nowProvider;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly Func<IHttpClientProvider> _httpClientProviderFactory;
        private readonly uint _tokenLifespan;

        public CaptchaValidationService(
            INowProvider nowProvider,
            IOptions<CaptchaOptions> options,
            IHttpContextAccessor contextAccessor,
            Func<IHttpClientProvider> httpClientProviderFactory)
        {
            _nowProvider = nowProvider;
            _contextAccessor = contextAccessor;
            _httpClientProviderFactory = httpClientProviderFactory;
            _options = options.Value;
            _tokenLifespan = _options.TokenLifespanInMinutes;
        }

        public async Task<bool> IsValidAsync(string validationToken)
        {
            if (string.IsNullOrEmpty(validationToken))
                return false;

            var uri = _options.ValidatorUrl;
            var ip = _contextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", _options.Secret),
                new KeyValuePair<string, string>("response", validationToken),
                new KeyValuePair<string, string>("remoteip", ip)
            });

            using (var client = _httpClientProviderFactory())
            using (var res = await client.PostAsync(uri, formContent))
            using (var content = res.Content)
            {
                var data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    var response = (JObject) JsonConvert.DeserializeObject(data);
                    var timestamp = response["challenge_ts"];
                    if (timestamp == null)
                    {
                        return false;
                    }

                    var dateTime = timestamp.Value<DateTime>();
                    if ((_nowProvider.Now().ToUniversalTime() - dateTime.ToUniversalTime()).TotalMinutes > _tokenLifespan)
                    {
                        return false;
                    }

                    var success = response["success"];
                    return success != null && success.Value<bool>();
                }
            }

            return false;
        }
    }
}