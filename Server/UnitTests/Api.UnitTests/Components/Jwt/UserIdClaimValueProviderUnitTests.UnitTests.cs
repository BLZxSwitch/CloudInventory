using System;
using System.Security.Claims;
using Api.Components.Jwt.UserIdClaimValueProvider;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class UserIdClaimValueProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsUserId()
        {
            var userId = new Guid("{EC2995E1-ADF0-4A7B-8A6F-A59F76FD176B}");
            var identityOptions = new IdentityOptions();

            var userIdClaim = new Claim(identityOptions.ClaimsIdentity.UserIdClaimType, userId.ToString());

            _mock.Mock<ClaimsPrincipal>()
                .Setup(identity => identity.Claims)
                .Returns(userIdClaim.ToEnumerable());

            _mock.Mock<IOptions<IdentityOptions>>()
                .Setup(options => options.Value)
                .Returns(identityOptions);

            var provider = _mock.Create<UserIdClaimValueProvider>();
            var actual = provider.GetValue();

            Assert.AreEqual(userId, actual);
        }
    }
}