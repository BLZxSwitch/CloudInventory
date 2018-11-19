using System;
using System.Threading.Tasks;
using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using Moq;
using Api.Components.CurrentTenantProvider;
using Api.Transports.Tenant;
using Api.Components.Tenants;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class TenantSettingsControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldUpdateTenantSettings()
        {
            Guid tenantId = Guid.NewGuid();

            var tenantSettings = new TenantSettingsDTO();

            var expected = new TenantSettingsDTO();
            
            var controller = _mock.Create<TenantSettingsController>();

            _mock.Mock<ICurrentTenantProvider>()
                .Setup(manager => manager.GetTenantIdAsync(controller.User))
                .ReturnsAsync(tenantId);

            _mock.Mock<ITenantSettingsService>()
                .Setup(service => service.UpdateAsync(tenantSettings, tenantId))
                .ReturnsAsync(expected);

            var actual = await controller.Update(tenantSettings);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnTenantSettings()
        {
            Guid tenantId = Guid.NewGuid();

            var expected = new TenantSettingsDTO();

            var controller = _mock.Create<TenantSettingsController>();

            _mock.Mock<ICurrentTenantProvider>()
                .Setup(manager => manager.GetTenantIdAsync(controller.User))
                .ReturnsAsync(tenantId);

            _mock.Mock<ITenantSettingsService>()
                .Setup(service => service.GetByTenantIdAsync(tenantId))
                .ReturnsAsync(expected);

            var actual = await controller.Get();

            ContentAssert.AreEqual(expected, actual);
        }
    }
}