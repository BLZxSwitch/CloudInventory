using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.CurrentTenantProvider;
using Api.Components.CurrentUserProvider;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components
{
    [TestClass]
    public class CurrentTenantProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsTenantId()
        {
            var claimsPrincipal = new ClaimsPrincipal();
            var tenantId = new Guid("{D80B76DB-3AB2-41E7-99FB-FB23605D7A8B}");
            var user = new User
            {
                SecurityUser = new SecurityUser
                {
                    TenantId = tenantId
                }
            };

            _mock.Mock<ICurrentUserProvider>()
                .Setup(context => context.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            var provider = _mock.Create<CurrentTenantProvider>();
            var actual = await provider.GetTenantIdAsync(claimsPrincipal);

            Assert.AreEqual(tenantId, actual);
        }
    }
}