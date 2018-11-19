using System.Text;
using Api.Components.Jwt;
using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Autofac.Extras.Moq;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class TokenValidationParametersProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsTokenValidationParameters()
        {
            const string issuer = "http://cloudinventory.ru/";

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret key"));

            var jwtTokenOptions = new JwtTokenOptions
            {
                Issuer = issuer
            };

            _mock.Mock<IOptions<JwtTokenOptions>>()
                .Setup(options => options.Value)
                .Returns(jwtTokenOptions);

            _mock.Mock<ISymmetricSecurityKeyProvider>()
                .Setup(provider => provider.GetKey())
                .Returns(symmetricSecurityKey);

            var service = _mock.Create<TokenValidationParametersProvider>();
            var actual = service.GetParameters();

            var expected = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                ValidAudience = issuer,
                IssuerSigningKey = symmetricSecurityKey
            };

            ContentAssert.AreEqual(expected, actual);
        }
    }
}