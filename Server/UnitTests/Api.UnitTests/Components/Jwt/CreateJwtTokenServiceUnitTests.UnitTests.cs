using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Components.Jwt.CreateJwtTokenAsStringService;
using Api.Components.Jwt.JwtSecurityTokenProvider;
using Api.Components.Jwt.JwtSecurityTokenWriter;
using Api.Components.Jwt.JwtTokenClaimsProvider;
using Api.Components.Jwt.JwtTokenExpireDateTimeProvider;
using Api.Components.Jwt.SigningCredentialsProvider;
using Autofac.Extras.Moq;
using EF.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class CreateJwtTokenAsStringServiceUnitTests
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
            const string jwtTokenString = "jwt token string";
            var expireDate = new DateTime(2018, 5, 3);
            var userId = new Guid("{ECFD1957-0BC8-4D81-A54C-BD4E49BDD792}");
            var claims = new List<Claim>();
            var signingCredentials = new SigningCredentials(new JsonWebKey(), SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken();
            var roles = new List<string> {
                    UserRoles.Employee.Name,
                    UserRoles.CompanyAdministrator.Name,
                };

            _mock.Mock<IJwtTokenClaimsProvider>()
                .Setup(provider => provider.GetClaims(userId, hasLongTimeToLive, roles))
                .Returns(claims);

            _mock.Mock<ISigningCredentialsProvider>()
                .Setup(provider => provider.Get())
                .Returns(signingCredentials);

            _mock.Mock<IJwtTokenExpireDateTimeProvider>()
                .Setup(provider => provider.Get(hasLongTimeToLive))
                .Returns(expireDate);

            _mock.Mock<IJwtSecurityTokenProvider>()
                .Setup(provider => provider.Create(claims, expireDate, signingCredentials))
                .Returns(jwtSecurityToken);

            _mock.Mock<IJwtSecurityTokenWriter>()
                .Setup(writer => writer.Write(jwtSecurityToken))
                .Returns(jwtTokenString);

            var service = _mock.Create<CreateJwtTokenAsStringService>();
            var actual = service.Create(userId, hasLongTimeToLive, roles);

            Assert.AreEqual(jwtTokenString, actual);
        }
    }
}