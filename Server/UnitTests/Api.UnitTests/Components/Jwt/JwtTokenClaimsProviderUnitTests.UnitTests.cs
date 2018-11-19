using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Components;
using Api.Components.GuidsProviders;
using Api.Components.Jwt.JwtTokenClaimsProvider;
using Autofac.Extras.Moq;
using EF.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class JwtTokenClaimsProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsJwtSecurityTokenClaims()
        {
            const bool hasLongTimeToLive = true;
            var jtiGuid = new Guid("{9A02969F-BA20-43E6-8E9F-70CD525C1942}");
            var userId = new Guid("{EC2995E1-ADF0-4A7B-8A6F-A59F76FD176B}");

            var roles = new List<string> {
                    UserRoles.Employee.Name,
                    UserRoles.CompanyAdministrator.Name,
                };

            _mock.Mock<INewGuidProvider>()
                .Setup(guidProvider => guidProvider.Get())
                .Returns(jtiGuid);

            var provider = _mock.Create<JwtTokenClaimsProvider>();
            var actual = provider.GetClaims(userId, hasLongTimeToLive, roles);

            var expected = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, jtiGuid.ToString()),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ProjectClaims.JwtTokenHasLongTimeToLiveClaimName, hasLongTimeToLive.ToString()),
                new Claim(ClaimTypes.Role, UserRoles.Employee.Name),
                new Claim(ClaimTypes.Role, UserRoles.CompanyAdministrator.Name)
            };

            ContentAssert.AreEqual(expected, actual);
        }
    }
}