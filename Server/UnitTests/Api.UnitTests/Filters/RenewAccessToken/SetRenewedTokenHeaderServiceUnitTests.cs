using Api.Filters.RenewAccessToken;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Filters.RenewAccessToken
{
    [TestClass]
    public class SetRenewedTokenHeaderServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void SetsRenewedTokenHeaderWithAccessPermission()
        {
            const string token = "token";

            _mock.Mock<HttpContext>()
                .Setup(context => context.Response)
                .Returns(_mock.Mock<HttpResponse>().Object);

            _mock.Mock<HttpResponse>()
                .Setup(request => request.Headers)
                .Returns(_mock.Mock<IHeaderDictionary>().Object);

            var provider = _mock.Create<SetRenewedTokenHeaderService>();
            provider.SetValue(token);

            _mock.Mock<IHeaderDictionary>()
                .Verify(dictionary => dictionary.Add(SetRenewedTokenHeaderService.RenewedTokenHeaderName, token));
            _mock.Mock<IHeaderDictionary>()
                .Verify(dictionary => dictionary.Add("Access-Control-Expose-Headers", SetRenewedTokenHeaderService.RenewedTokenHeaderName));
        }
    }
}