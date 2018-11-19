using Api.Common;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Specialized;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Common
{
    [TestClass]
    public class ClientUriServiceUnitTest
    {
        private AutoMock _mock;
        private ClientUriService _clientUriService;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _clientUriService = _mock.Create<ClientUriService>();

            _mock.Mock<ICommonConfiguration>()
                    .SetupGet(x => x.ClientBaseUrl)
                    .Returns("http://cloudinventory.ru");
        }

        [TestMethod]
        public void ShouldBuildUri()
        {
            var expected = "http://cloudinventory.ru/some-relative-url?userId=userId1&code=code1";

            var actual = _clientUriService.BuildUri("some-relative-url", new NameValueCollection() {
                { "userId", "userId1" },
                { "code", "code1" },
            });

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
