using System;
using System.Threading.Tasks;
using Api.Components.Identities;
using Api.Components.SecurityUsers;
using Api.Controllers;
using Api.Transports.Common;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using Moq;
using Api.Components.UserSettings;
using AutoMapper;
using EF.Models;
using EF.Models.Models;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class UserSettingsControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldUpdateUserSettings()
        {
            Guid userId = Guid.NewGuid();

            var userSettings = new UserSettingsDTO();

            var expected = new UserSettingsDTO();
            
            var controller = _mock.Create<UserSettingsController>();

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(controller.User))
                .Returns(userId);

            _mock.Mock<IUserSettingsService>()
                .Setup(service => service.UpdateAsync(userSettings, userId))
                .ReturnsAsync(expected);

            var actual = await controller.Update(userSettings);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnUserSettingsDTOOnGetAction()
        {
            Guid userId = Guid.NewGuid();
            Guid securityUserId = Guid.NewGuid();

            var securityUser = new SecurityUser
            {
                Id = securityUserId
            };

            var expected = new UserSettingsDTO();

            var controller = _mock.Create<UserSettingsController>();

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(controller.User))
                .Returns(userId);

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByUserIdAsync(userId))
                .ReturnsAsync(securityUser);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<UserSettingsDTO>(securityUser))
                .Returns(expected);

            var actual = await controller.Get();

            ContentAssert.AreEqual(expected, actual);
        }
    }
}