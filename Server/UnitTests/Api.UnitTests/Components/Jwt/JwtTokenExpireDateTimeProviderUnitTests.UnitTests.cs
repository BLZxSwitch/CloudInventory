using System;
using Api.Components.Jwt;
using Api.Components.Jwt.JwtTokenExpireDateTimeProvider;
using Api.Components.NowProvider;
using Autofac.Extras.Moq;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class JwtTokenExpireDateTimeProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsExpiresDateForShortTimeToLive()
        {
            var now = new DateTime(2018, 5, 3);
            const int timeToLive = 15;

            var jwtTokenOptions = new JwtTokenOptions
            {
                ExpireMinutesShortToken = timeToLive
            };

            _mock.Mock<INowProvider>()
                .Setup(provider => provider.Now())
                .Returns(now);

            _mock.Mock<IOptions<JwtTokenOptions>>()
                .Setup(options => options.Value)
                .Returns(jwtTokenOptions);

            var service = _mock.Create<JwtTokenExpireDateTimeProvider>();
            var actual = service.Get(false);

            var expected = now.AddMinutes(timeToLive);
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ReturnsExpiresDateForLongTimeToLive()
        {
            var now = new DateTime(2018, 5, 3);
            const int timeToLive = 30;

            var jwtTokenOptions = new JwtTokenOptions
            {
                ExpireDaysLongToken = timeToLive
            };

            _mock.Mock<INowProvider>()
                .Setup(provider => provider.Now())
                .Returns(now);

            _mock.Mock<IOptions<JwtTokenOptions>>()
                .Setup(options => options.Value)
                .Returns(jwtTokenOptions);

            var service = _mock.Create<JwtTokenExpireDateTimeProvider>();
            var actual = service.Get(true);

            var expected = now.AddDays(timeToLive);
            Assert.AreEqual(expected, actual);
        }
    }
}