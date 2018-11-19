using System.Security.Claims;
using Api.Components;
using Api.Components.Jwt.TokenTTLClaimValueProvider;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class TokenTtlClaimValueProviderUnitTests
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
            var hasLongTimeToLive = true;

            var claim = new Claim(ProjectClaims.JwtTokenHasLongTimeToLiveClaimName, hasLongTimeToLive.ToString());

            _mock.Mock<ClaimsPrincipal>()
                .Setup(identity => identity.Claims)
                .Returns(claim.ToEnumerable());

            var provider = _mock.Create<TokenTtlClaimValueProvider>();
            var actual = provider.HasLongTimeToLive();

            Assert.AreEqual(hasLongTimeToLive, actual);
        }
    }
}