using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Api.Components.Jwt.RolesClaimValueProvider;
using Autofac.Extras.Moq;
using EF.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class RolesClaimValueProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsRoles()
        {
            var roles = new List<string> {
                    UserRoles.Employee.Name,
                    UserRoles.CompanyAdministrator.Name,
                };
            var identityOptions = new IdentityOptions();

            var rolesClaims = roles.Select(role=>new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role)) ;

            _mock.Mock<ClaimsPrincipal>()
                .Setup(identity => identity.Claims)
                .Returns(rolesClaims);

            _mock.Mock<IOptions<IdentityOptions>>()
                .Setup(options => options.Value)
                .Returns(identityOptions);

            var provider = _mock.Create<RolesClaimValueProvider>();
            var actual = provider.GetValue() as List<string>;

            CollectionAssert.AreEqual(roles, actual);
        }
    }
}