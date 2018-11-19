using Api.Filters.RenewAccessToken;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Filters.RenewAccessToken
{
    [TestClass]
    public class AuthorizationHeaderAsBearerTokenProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsAuthorizationHeaderAsBearerToken()
        {
            const string token = "token";
            var authorizationHeaderValue = $"Bearer {token}";

            _mock.Mock<HttpContext>()
                .Setup(context => context.Request)
                .Returns(_mock.Mock<HttpRequest>().Object);

            _mock.Mock<HttpRequest>()
                .Setup(request => request.Headers)
                .Returns(_mock.Mock<IHeaderDictionary>().Object);

            _mock.Mock<IHeaderDictionary>()
                .Setup(dictionary => dictionary["Authorization"])
                .Returns(authorizationHeaderValue);

            var provider = _mock.Create<AuthorizationHeaderAsBearerTokenProvider>();
            var actual = provider.AsBearerToken();

            Assert.AreEqual(token, actual);
        }

        [TestMethod]
        public void ReturnsNullWhenValueDoesNotMatchBearerSchema()
        {
            const string token = "token";
            var authorizationHeaderValue = $"Other_schema {token}";

            _mock.Mock<HttpContext>()
                .Setup(context => context.Request)
                .Returns(_mock.Mock<HttpRequest>().Object);

            _mock.Mock<HttpRequest>()
                .Setup(request => request.Headers)
                .Returns(_mock.Mock<IHeaderDictionary>().Object);

            _mock.Mock<IHeaderDictionary>()
                .Setup(dictionary => dictionary["Authorization"])
                .Returns(authorizationHeaderValue);

            var provider = _mock.Create<AuthorizationHeaderAsBearerTokenProvider>();
            var actual = provider.AsBearerToken();

            Assert.IsNull(actual);
        }

        [TestMethod]
        public void ReturnsNullWhenHeaderIsNotPresent()
        {
            _mock.Mock<HttpContext>()
                .Setup(context => context.Request)
                .Returns(_mock.Mock<HttpRequest>().Object);

            _mock.Mock<HttpRequest>()
                .Setup(request => request.Headers)
                .Returns(_mock.Mock<IHeaderDictionary>().Object);

            var provider = _mock.Create<AuthorizationHeaderAsBearerTokenProvider>();
            var actual = provider.AsBearerToken();

            Assert.IsNull(actual);
        }
    }
}