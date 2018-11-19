using System;
using System.Threading;
using System.Threading.Tasks;
using Autofac.Extras.Moq;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;
using Api.Components.UserSettings;
using Api.Components.SecurityUsers;
using Api.Transports.Common;

namespace Api.UnitTests.Components.UserSettings
{
    [TestClass]
    public class UserSettingsServiceUnitTests
    {
        private AutoMock _mock;
        private UserSettingsService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<UserSettingsService>();
        }

        [TestMethod]
        public async Task ShouldUpdateSecurityUser()
        {
            var usertId = Guid.NewGuid();
            var securityUser = new SecurityUser();

            var expected = new UserSettingsDTO();

            var userSettingsDTO = new UserSettingsDTO();

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByUserIdAsync(usertId))
                .ReturnsAsync(securityUser);
            
            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map(userSettingsDTO, securityUser))
                .Returns(securityUser);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<UserSettingsDTO>(securityUser))
                .Returns(expected);

            var actual = await _service.UpdateAsync(userSettingsDTO, usertId);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(securityUser));

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)));

            ContentAssert.AreEqual(expected, actual);
        }
    }
}