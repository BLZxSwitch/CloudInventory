using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Components.Otp;
using Api.Components.SecurityUsers;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpDeactivationServiceUnitTests
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
            var credentials = new OtpActivationRequestParams
            {
                UserId = userId
            };

            var secretKey = "secret key";
            var securityUser = new SecurityUser
            {
                TwoFactorAuthenticationSecretKey = secretKey
            };

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByUserIdAsync(userId))
                .ReturnsAsync(securityUser);

            var service = _mock.Create<OtpDeactivationService>();
            await service.DeactivateAsync(credentials);

            var expected = new SecurityUser
            {
                TwoFactorAuthenticationSecretKey = null
            };

            ContentAssert.AreEqual(expected, securityUser);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(securityUser), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Once);
        }
    }

}
