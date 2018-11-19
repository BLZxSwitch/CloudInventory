using System.Text;
using Api.Components.Jwt;
using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Autofac.Extras.Moq;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class SymmetricSecurityKeyProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsSymmetricSecurityKey()
        {
            const string secretKey = "secret key";

            var jwtTokenOptions = new JwtTokenOptions
            {
                Key = secretKey
            };

            _mock.Mock<IOptions<JwtTokenOptions>>()
                .Setup(options => options.Value)
                .Returns(jwtTokenOptions);

            var provider = _mock.Create<SymmetricSecurityKeyProvider>();
            var actual = provider.GetKey();

            var expected = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            ContentAssert.AreEqual(expected, actual);
        }
    }
}