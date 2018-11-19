using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Components.Jwt;
using Api.Components.Jwt.JwtSecurityTokenProvider;
using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Autofac.Extras.Moq;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Jwt
{
    [TestClass]
    public class JwtSecurityTokenProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsJwtSecurityToken()
        {
            const string issuer = "http://cloudinventory.ru/";
            var expires = new DateTime(2018, 5, 3);
            var jwtTokenOptions = new JwtTokenOptions
            {
                Issuer = issuer
            };
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret key"));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();

            _mock.Mock<IOptions<JwtTokenOptions>>()
                .Setup(options => options.Value)
                .Returns(jwtTokenOptions);

            _mock.Mock<ISymmetricSecurityKeyProvider>()
                .Setup(provider => provider.GetKey())
                .Returns(symmetricSecurityKey);

            var service = _mock.Create<JwtSecurityTokenProvider>();
            var actual = service.Create(claims, expires, signingCredentials);

            var expected = new JwtSecurityToken(issuer, issuer, claims, expires: expires,
                signingCredentials: signingCredentials);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}