using System;
using System.Threading;
using System.Threading.Tasks;
using Autofac.Extras.Moq;
using AutoMapper;
using EF.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using Api.Components.Tenants;
using Api.Transports.Tenant;
using UnitTests.Components.Extensions;
using System.Collections.Generic;
using EF.Models.Models;
using Api.Profiles;

namespace Api.UnitTests.Components.Tenants
{
    [TestClass]
    public class TenantSettingsServiceUnitTests
    {
        private AutoMock _mock;
        private TenantSettingsService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<TenantSettingsService>();

            Mapper.Reset();

            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<TenantSettingsProfile>();
            });
        }

        [TestMethod]
        public async Task ShouldGetTenantSettings()
        {
            var tenantId = Guid.NewGuid();
            var tenantSettings = new TenantSettings()
            {
                TenantId = tenantId,
            };

            var expected = new TenantSettingsDTO();

            var tenantSettingsList = new List<TenantSettings>()
            {
                tenantSettings,
                new TenantSettings()
                {
                    TenantId = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.TenantSettings)
                .ReturnsAsDbSet(tenantSettingsList);

            var actual = await _service.GetByTenantIdAsync(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldUpdateTenantSettings()
        {
            var tenantId = Guid.NewGuid();
            var tenantSettings = new TenantSettings()
            {
                TenantId = tenantId
            };

            var expected = new TenantSettingsDTO();

            var tenantSettingsDTO = new TenantSettingsDTO();

            var tenantSettingsList = new List<TenantSettings>()
            {
                tenantSettings,
                new TenantSettings()
                {
                    TenantId = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.TenantSettings)
                .ReturnsAsDbSet(tenantSettingsList);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map(tenantSettingsDTO, tenantSettings))
                .Returns(tenantSettings);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<TenantSettingsDTO>(tenantSettings))
                .Returns(expected);

            var actual = await _service.UpdateAsync(tenantSettingsDTO, tenantId);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(tenantSettings));

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)));

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldAddTenantSettings()
        {
            var tenantId = Guid.NewGuid();
            var tenantSettings = new TenantSettings();

            var expected = new TenantSettingsDTO();

            var tenantSettingsDTO = new TenantSettingsDTO();

            var tenantSettingsList = new List<TenantSettings>()
            {
                new TenantSettings()
                {
                    TenantId = Guid.NewGuid(),
                }
            };

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<TenantSettings>(tenantSettingsDTO))
                .Returns(tenantSettings);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<TenantSettingsDTO>(tenantSettings))
                .Returns(expected);

            _mock.Mock<IInventContext>()
                .Setup(context => context.TenantSettings.Add(tenantSettings))
                .Callback((TenantSettings e) => { e.Id = Guid.NewGuid(); });

            _mock.Mock<IInventContext>()
                .Setup(context => context.TenantSettings)
                .ReturnsAsDbSet(tenantSettingsList);

            var actual = await _service.UpdateAsync(tenantSettingsDTO, tenantId);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)));

            ContentAssert.AreEqual(expected, actual);
        }
    }
}