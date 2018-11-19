using Api.Components.CurrentUserProvider;
using Api.Components.Otp;
using Api.Transports.AuthOtp;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpDeactivationRequestParamProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsActivationRequestParams()
        {
            var otp = "123456";
            var password = "password";
            var secretKey = new byte[] {1};
            var userId = new Guid("{289D2B80-8FFA-43FC-996A-871CC5145308}");
            var user = new User
            {
                Id = userId
            };
            var credentials = new OtpDeactivationRequest
            {
                Otp = otp,
                Password = password
            };

            var claimsPrincipal = _mock.Mock<ClaimsPrincipal>().Object;
            var httpContext = _mock.Mock<HttpContext>().Object;

            _mock.Mock<IOtpSecretKeyProvider>()
                .Setup(instance => instance.ReadAsync(userId))
                .ReturnsAsync(secretKey);

            _mock.Mock<HttpContext>()
                .SetupGet(context => context.User)
                .Returns(claimsPrincipal);

            _mock.Mock<IHttpContextAccessor>()
                .SetupGet(accessor => accessor.HttpContext)
                .Returns(httpContext);

            _mock.Mock<ICurrentUserProvider>()
                .Setup(instance => instance.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            var provider = _mock.Create<OtpDeactivationRequestParamProvider>();
            var actual = await provider.GetAsync(credentials);

            var expected = new OtpActivationRequestParams
            {
                Otp = otp,
                Password = password,
                SecretKey = secretKey,
                UserId = userId
            };

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
