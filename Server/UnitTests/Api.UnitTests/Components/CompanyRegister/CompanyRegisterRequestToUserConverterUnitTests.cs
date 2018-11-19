using Api.Components.CompanyRegister;
using Api.Components.GuidsProviders;
using Api.Transports.CompanyRegister;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.CompanyRegister
{
    [TestClass]
    public class CompanyRegisterRequestToUserConverterUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyRegisterRequestToUserConverter>();
        }

        [TestMethod]
        public void ReturnsUser()
        {
            const string companyName = "company name";
            const string email = "max@m.m";
            const string firstName = "First Name";
            const string lastName = "Last Name";
            const string password = "Password";
            var concurrencyStamp = new Guid("{F031AC41-810E-4A26-B4CE-4DD7E29434DF}");

            var request = new CompanyRegisterRequest
            {
                CompanyName = companyName,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                Password = password
            };

            _mock.Mock<INewGuidProvider>()
                .Setup(provider => provider.Get())
                .Returns(concurrencyStamp);

            var converter = _mock.Create<CompanyRegisterRequestToUserConverter>();
            var actual = converter.Convert(request);

            var company = new Company
            {
                Name = companyName
            };

            var tenant = new Tenant
            {
                IsActive = true,
                Name = request.CompanyName,
                Company = company,
            };

            var expected = new User
            {
                UserName = email,
                Email = email,
                SecurityUser = new SecurityUser
                {
                    IsActive = true,
                    IsInvited = true,
                    IsInvitationAccepted = true,
                    Tenant = tenant,
                    Employee = new Employee
                    {
                        Company = company,
                        FirstName = firstName,
                        LastName = lastName,
                        Tenant = tenant,
                    }

                },
                ConcurrencyStamp = concurrencyStamp.ToString()
            };

            ContentAssert.AreEqual(expected, actual);
        }
    }
}