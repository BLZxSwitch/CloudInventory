using Api.Providers.CompanyProviders;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Providers.CompanyProviders
{
    [TestClass]
    public class CompanyProviderUnitTests
    {
        private AutoMock _mock;
        private CompanyProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<CompanyProvider>();
        }

        [TestMethod]
        public async Task ShouldReturnAllEmployeesOfAdminsCompany()
        {
            var tenantId = Guid.NewGuid();
            var expected = new Company()
            {
                Id = Guid.NewGuid(),
                TenantId = tenantId,
            };

            var companies = new List<Company>()
            {
                expected
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Companies)
                .ReturnsAsDbSet(companies);

            var actual = await _provider.GetByTenantIdAsync(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
