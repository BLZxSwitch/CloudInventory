using Api.Filters.RenewAccessToken;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Filters.RenewAccessToken
{
    [TestClass]
    public class RequestMethodProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsTrueWhenRequestMethodIsOptions()
        {
            _mock.Mock<HttpContext>()
                .Setup(context => context.Request)
                .Returns(_mock.Mock<HttpRequest>().Object);

            _mock.Mock<HttpRequest>()
                .Setup(request => request.Method)
                .Returns("OpTIoNS");

            var provider = _mock.Create<RequestMethodProvider>();
            var actual = provider.IsOptionsRequest();

            Assert.IsTrue(actual);
        }
    }
}