using System.Security.Claims;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenClaimsPrincipalFactory;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Autofac.Extras.Moq;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class TokenClaimsPrincipalFactoryUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsClaimsPrincipal()
        {
            const string jwtToken = "token";
            var principal = new ClaimsPrincipal();
            var tokenValidationParameters = new TokenValidationParameters();

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(parametersProvider => parametersProvider.GetParameters())
                .Returns(tokenValidationParameters);

            _mock.Mock<IJwtSecurityTokenValidator>()
                .Setup(validator => validator.Validate(jwtToken, tokenValidationParameters))
                .Returns(principal);

            var provider = _mock.Create<TokenClaimsPrincipalFactory>();
            var actual = provider.Create(jwtToken);

            Assert.AreSame(principal, actual);
        }

        [TestMethod]
        public void ReturnsNullWhenValidationIsNotSuccessful()
        {
            const string jwtToken = "token";
            var tokenValidationParameters = new TokenValidationParameters();

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(parametersProvider => parametersProvider.GetParameters())
                .Returns(tokenValidationParameters);

            _mock.Mock<IJwtSecurityTokenValidator>()
                .Setup(validator => validator.Validate(jwtToken, tokenValidationParameters))
                .Throws<SecurityTokenValidationException>();

            var provider = _mock.Create<TokenClaimsPrincipalFactory>();
            var actual = provider.Create(jwtToken);

            Assert.IsNull(actual);
        }
    }
}