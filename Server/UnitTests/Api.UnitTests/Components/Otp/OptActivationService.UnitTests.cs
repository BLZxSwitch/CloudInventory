using Api.Components.Otp;
using Api.Components.SecurityUsers;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OptActivationServiceUnitTests
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
            var userId = new Guid("{FF9C001A-075B-4ACB-B31F-07E818A56A99}");
            var secretKeyData = new byte[] { 1 };
            var credentials = new OtpActivationRequestParams
            {
                UserId = userId,
                SecretKey = secretKeyData
            };

            var secretKey = "secret key";
            var securityUser = new SecurityUser
            {
                TwoFactorAuthenticationSecretKey = null
            };

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByUserIdAsync(userId))
                .ReturnsAsync(securityUser);

            _mock.Mock<IProtectedDataProvider>()
                .Setup(provider => provider.Protect(secretKeyData))
                .Returns(secretKey);

            var service = _mock.Create<OtpActivationService>();
            await service.ActivateAsync(credentials);

            var expected = new SecurityUser
            {
                TwoFactorAuthenticationSecretKey = secretKey
            };

            ContentAssert.AreEqual(expected, securityUser);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(securityUser), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Once);
        }
    }
}
