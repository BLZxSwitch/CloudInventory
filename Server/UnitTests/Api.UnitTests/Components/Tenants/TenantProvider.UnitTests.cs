using Api.Components.Tenants;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Tenants
{
    [TestClass]
    public class TenantProviderUnitTests
    {
        private AutoMock _mock;
        private TenantProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<TenantProvider>();
        }

        [TestMethod]
        public async Task ShouldReturnTenant()
        {
            var tenantId = Guid.NewGuid();

            var expected = new Tenant()
            {
                Id = tenantId,
            };
            var tenants = new List<Tenant>()
            {
                expected,
                new Tenant()
                {
                    Id = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Tenants)
                .ReturnsAsDbSet(tenants);

            var actual = await _provider.GetByIdAsync(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
