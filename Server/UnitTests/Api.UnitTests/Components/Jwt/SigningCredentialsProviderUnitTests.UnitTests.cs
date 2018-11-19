using System.Text;
using Api.Components.Jwt.SigningCredentialsProvider;
using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Autofac.Extras.Moq;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class SigningCredentialsProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsSigningCredentials()
        {
            const string secretKey = "secret key";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            _mock.Mock<ISymmetricSecurityKeyProvider>()
                .Setup(keyProvider => keyProvider.GetKey())
                .Returns(key);

            var provider = _mock.Create<SigningCredentialsProvider>();
            var actual = provider.Get();

            var expected = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            ContentAssert.AreEqual(expected, actual);
        }
    }
}