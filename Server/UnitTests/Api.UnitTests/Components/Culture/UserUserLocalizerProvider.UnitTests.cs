using Api.Components.Culture;
using Autofac.Extras.Moq;
using EF.Models.Enums;
using EF.Models.Models;
using Microsoft.Extensions.Localization;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Globalization;

namespace Api.UnitTests.Components.Culture
{
    [TestClass]
    public class UserUserLocalizerProviderUnitTests
    {
        private AutoMock _mock;
        private UserLocalizerProvider<TestResorce> _target;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _target = _mock.Create<UserLocalizerProvider<TestResorce>>();
        }

        [TestMethod]
        public void ShouldRetrunStringLocalizerForUserLanguage()
        {
            var user = new SecurityUser()
            {
                CultureName = "ru"
            };
            var cultureInfo = CultureInfo.CreateSpecificCulture("ru");
            var expected = _mock.Mock<IStringLocalizer>().Object;

            _mock.Mock<IStringLocalizer<TestResorce>>()
                .Setup(context => context.WithCulture(cultureInfo))
                .Returns(expected);

            _mock.Mock<ICultureInfoProvider>()
                .Setup(context => context.Get("ru"))
                .Returns(cultureInfo);

            var actual = _target.Get(user);
            
            Assert.AreSame(expected, actual);
        }
    }

    public class TestResorce
    {

    }
}
