using System;
using System.Collections.Generic;
using System.Security.Claims;
using Api.Components.Factories;
using Api.Components.Jwt.CreateJwtTokenAsStringService;
using Api.Components.Jwt.RenewAccessTokenService;
using Api.Components.Jwt.RolesClaimValueProvider;
using Api.Components.Jwt.TokenClaimsPrincipalFactory;
using Api.Components.Jwt.TokenTTLClaimValueProvider;
using Api.Components.Jwt.UserIdClaimValueProvider;
using Autofac.Extras.Moq;
using EF.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class RenewAccessTokenServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsRenewedToken()
        {
            const bool hasLongTimeToLive = true;
            const string outdatedJwtToken = "outdated bearer token";
            const string renewedToken = "renewed token";
            var userId = new Guid("{95F0CB0C-C8D6-4105-98F0-721BEDBAEF25}");
            var roles = new List<string> {
                    UserRoles.Employee.Name,
                    UserRoles.CompanyAdministrator.Name,
                };

            var claimsPrincipal = new Mock<ClaimsPrincipal>().Object;

            _mock.Mock<IFactory<ClaimsPrincipal, IUserIdClaimValueProvider>>()
                .Setup(factory => factory.Create(claimsPrincipal))
                .Returns(_mock.Mock<IUserIdClaimValueProvider>().Object);

            _mock.Mock<IFactory<ClaimsPrincipal, ITokenTTLClaimValueProvider>>()
                .Setup(factory => factory.Create(claimsPrincipal))
                .Returns(_mock.Mock<ITokenTTLClaimValueProvider>().Object);

            _mock.Mock<IFactory<ClaimsPrincipal, IRolesClaimValueProvider>>()
                .Setup(factory => factory.Create(claimsPrincipal))
                .Returns(_mock.Mock<IRolesClaimValueProvider>().Object);

            _mock.Mock<ITokenClaimsPrincipalFactory>()
                .Setup(provider => provider.Create(outdatedJwtToken))
                .Returns(claimsPrincipal);

            _mock.Mock<IUserIdClaimValueProvider>()
                .Setup(provider => provider.GetValue())
                .Returns(userId);

            _mock.Mock<ITokenTTLClaimValueProvider>()
                .Setup(provider => provider.HasLongTimeToLive())
                .Returns(hasLongTimeToLive);

            _mock.Mock<IRolesClaimValueProvider>()
                .Setup(provider => provider.GetValue())
                .Returns(roles);

            _mock.Mock<ICreateJwtTokenAsStringService>()
                .Setup(instance => instance.Create(userId, hasLongTimeToLive, roles))
                .Returns(renewedToken);

            var service = _mock.Create<RenewAccessTokenService>();
            var actual = service.Renew(outdatedJwtToken);

            Assert.AreEqual(renewedToken, actual);
        }

        [TestMethod]
        public void ReturnsNullWhenOutdatedTokenIsNotPresent()
        {
            var service = _mock.Create<RenewAccessTokenService>();
            var actual = service.Renew(null);

            Assert.IsNull(actual);
        }

        [TestMethod]
        public void ReturnsNullWhenItIsNotPossibleToCreatePrincipalObject()
        {
            const string outdatedJwtToken = "outdated bearer token";

            _mock.Mock<ITokenClaimsPrincipalFactory>()
                .Setup(provider => provider.Create(outdatedJwtToken))
                .Returns(null as ClaimsPrincipal);

            var service = _mock.Create<RenewAccessTokenService>();
            var actual = service.Renew(outdatedJwtToken);

            Assert.IsNull(actual);
        }
    }
}