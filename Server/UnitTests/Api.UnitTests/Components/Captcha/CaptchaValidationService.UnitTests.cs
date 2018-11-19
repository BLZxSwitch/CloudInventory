using Api.Components.Captcha;
using Api.Components.HttpClient;
using Api.Components.NowProvider;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Captcha
{
    [TestClass]
    public class CaptchaValidationServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldReturnTrueWhenValidationResultSuccessful()
        {
            var token = "token";
            var validatorUrl = "uri";

            uint tokenLifespanInMinutes = 10;
            var captchaOptions = new CaptchaOptions
            {
                TokenLifespanInMinutes = tokenLifespanInMinutes,
                ValidatorUrl = validatorUrl,
                Secret = "secret"
            };
            var clientIP = "1.0.0.0";
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", captchaOptions.Secret),
                new KeyValuePair<string, string>("response", token),
                new KeyValuePair<string, string>("remoteip", clientIP)
            });

            _mock.Mock<IOptions<CaptchaOptions>>()
                .SetupGet(instance => instance.Value)
                .Returns(captchaOptions);
            var now = new DateTime(2018, 1, 1);
            var issuedTime = new DateTime(2018, 1, 1).AddMinutes(-tokenLifespanInMinutes);
            _mock.Mock<INowProvider>()
                .Setup(instance => instance.Now())
                .Returns(now);

            var response = new
            {
                challenge_ts = issuedTime.ToUniversalTime(),
                success = true
            };
            var httpResponse = new HttpResponseMessage
            {
                Content = new StringContent(JsonConvert.SerializeObject(response))
            };
            _mock.Mock<IHttpClientProvider>()
                .Setup(instance =>instance.PostAsync(
                    validatorUrl,
                    It.Is<FormUrlEncodedContent>(content => ContentAssert.IsEqual(formContent, content))))
                .ReturnsAsync(httpResponse);

            _mock.Mock<ConnectionInfo>()
                .Setup(instance => instance.RemoteIpAddress)
                .Returns(IPAddress.Parse(clientIP));
            var connection = _mock.Mock<ConnectionInfo>().Object;

            _mock.Mock<HttpContext>()
                .Setup(instance => instance.Connection)
                .Returns(connection);
            var httpContext = _mock.Mock<HttpContext>().Object;

            _mock.Mock<IHttpContextAccessor>()
                .Setup(instance => instance.HttpContext)
                .Returns(httpContext);

            var service = _mock.Create<CaptchaValidationService>();
            var actual = await service.IsValidAsync(token);

            Assert.IsTrue(actual);
        }

        [TestMethod]
        public async Task ShouldReturnFalseWhenValidationLifeTimeElapsed()
        {
            var token = "token";
            var validatorUrl = "uri";

            uint tokenLifespanInMinutes = 10;
            var captchaOptions = new CaptchaOptions
            {
                TokenLifespanInMinutes = tokenLifespanInMinutes,
                ValidatorUrl = validatorUrl,
                Secret = "secret"
            };
            var clientIP = "1.0.0.0";
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", captchaOptions.Secret),
                new KeyValuePair<string, string>("response", token),
                new KeyValuePair<string, string>("remoteip", clientIP)
            });

            _mock.Mock<IOptions<CaptchaOptions>>()
                .SetupGet(instance => instance.Value)
                .Returns(captchaOptions);
            var now = new DateTime(2018, 1, 1);
            var issuedTime = new DateTime(2018, 1, 1).AddMinutes(-tokenLifespanInMinutes).AddTicks(-1);
            _mock.Mock<INowProvider>()
                .Setup(instance => instance.Now())
                .Returns(now);

            var response = new
            {
                challenge_ts = issuedTime.ToUniversalTime(),
                success = true
            };
            var httpResponse = new HttpResponseMessage
            {
                Content = new StringContent(JsonConvert.SerializeObject(response))
            };
            _mock.Mock<IHttpClientProvider>()
                .Setup(instance => instance.PostAsync(
                    validatorUrl,
                    It.Is<FormUrlEncodedContent>(content => ContentAssert.IsEqual(formContent, content))))
                .ReturnsAsync(httpResponse);

            _mock.Mock<ConnectionInfo>()
                .Setup(instance => instance.RemoteIpAddress)
                .Returns(IPAddress.Parse(clientIP));
            var connection = _mock.Mock<ConnectionInfo>().Object;

            _mock.Mock<HttpContext>()
                .Setup(instance => instance.Connection)
                .Returns(connection);
            var httpContext = _mock.Mock<HttpContext>().Object;

            _mock.Mock<IHttpContextAccessor>()
                .Setup(instance => instance.HttpContext)
                .Returns(httpContext);

            var service = _mock.Create<CaptchaValidationService>();
            var actual = await service.IsValidAsync(token);

            Assert.IsFalse(actual);
        }

        [TestMethod]
        public async Task ShouldReturnFalseWhenValidationFailed()
        {
            var token = "token";
            var validatorUrl = "uri";

            uint tokenLifespanInMinutes = 10;
            var captchaOptions = new CaptchaOptions
            {
                TokenLifespanInMinutes = tokenLifespanInMinutes,
                ValidatorUrl = validatorUrl,
                Secret = "secret"
            };
            var clientIP = "1.0.0.0";
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", captchaOptions.Secret),
                new KeyValuePair<string, string>("response", token),
                new KeyValuePair<string, string>("remoteip", clientIP)
            });

            _mock.Mock<IOptions<CaptchaOptions>>()
                .SetupGet(instance => instance.Value)
                .Returns(captchaOptions);
            var now = new DateTime(2018, 1, 1);
            var issuedTime = new DateTime(2018, 1, 1).AddMinutes(-tokenLifespanInMinutes);
            _mock.Mock<INowProvider>()
                .Setup(instance => instance.Now())
                .Returns(now);

            var response = new
            {
                challenge_ts = issuedTime.ToUniversalTime(),
                success = false
            };
            var httpResponse = new HttpResponseMessage
            {
                Content = new StringContent(JsonConvert.SerializeObject(response))
            };
            _mock.Mock<IHttpClientProvider>()
                .Setup(instance => instance.PostAsync(
                    validatorUrl,
                    It.Is<FormUrlEncodedContent>(content => ContentAssert.IsEqual(formContent, content))))
                .ReturnsAsync(httpResponse);

            _mock.Mock<ConnectionInfo>()
                .Setup(instance => instance.RemoteIpAddress)
                .Returns(IPAddress.Parse(clientIP));
            var connection = _mock.Mock<ConnectionInfo>().Object;

            _mock.Mock<HttpContext>()
                .Setup(instance => instance.Connection)
                .Returns(connection);
            var httpContext = _mock.Mock<HttpContext>().Object;

            _mock.Mock<IHttpContextAccessor>()
                .Setup(instance => instance.HttpContext)
                .Returns(httpContext);
            var service = _mock.Create<CaptchaValidationService>();
            var actual = await service.IsValidAsync(token);

            Assert.IsFalse(actual);
        }
    }
}
