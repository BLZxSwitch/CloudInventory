using Api.Components.EmailTaken;
using Api.Transports.Employees;
using Autofac.Extras.Moq;
using EF.Models.Enums;
using FluentValidation.Results;
using FluentValidation.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Transport.Employees
{
    [TestClass]
    public class EmployeeDTOValidatorUnitTests
    {
        private AutoMock _mock;
        private EmployeeDTOValidator _validator;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _validator = _mock.Create<EmployeeDTOValidator>();
        }

        [TestMethod]
        public void HasAppropriateValidators()
        {
            _validator
                .HasPropertyRule(request => request.Id)
                .HasValidator<AsyncPredicateValidator>();
            _validator
                .HasPropertyRule(request => request.DateOfBirth)
                .HasValidator<PredicateValidator>();
            _validator
                .HasPropertyRule(request => request.Email)
                .HasValidator<EmailValidator, AsyncPredicateValidator>();
            _validator
                .HasPropertyRule(request => request.FirstName)
                .HasValidator<NotNullValidator, NotEmptyValidator>();
            _validator
                .HasPropertyRule(request => request.LastName)
                .HasValidator<NotNullValidator, NotEmptyValidator>();
        }

        [TestMethod]
        public async Task ReturnsValidWhenModelWithoutIdIsValid()
        {
            const string email = "email@m.m";
            var claimsPrincipal = _mock.Mock<ClaimsPrincipal>().Object;
            var httpContext = _mock.Mock<HttpContext>().Object;

            var request = new EmployeeDTO
            {
                DateOfBirth = DateTime.Now,
                Email = email,
                FirstName = "FirstName",
                LastName = "LastName",
                Gender = Gender.Female,
                Phone = "Phone",
            };

            _mock.Mock<HttpContext>()
                .SetupGet(context => context.User)
                .Returns(claimsPrincipal);

            _mock.Mock<IHttpContextAccessor>()
                .SetupGet(accessor => accessor.HttpContext)
                .Returns(httpContext);

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(provider => provider.IsTaken(email))
                .ReturnsAsync(false);

            var actual = await _validator.ValidateAsync(request);

            ContentAssert.AreEqual(new ValidationResult(), actual);
        }

        [TestMethod]
        public async Task ReturnsValidWhenModelWithIdIsValid()
        {
            const string email = "email@m.m";
            var claimsPrincipal = _mock.Mock<ClaimsPrincipal>().Object;
            var httpContext = _mock.Mock<HttpContext>().Object;

            var request = new EmployeeDTO
            {
                Id = Guid.NewGuid(),
                DateOfBirth = DateTime.Now,
                Email = email,
                FirstName = "FirstName",
                LastName = "LastName",
                Gender = Gender.Female,
                Phone = "Phone",
            };

            _mock.Mock<HttpContext>()
                .SetupGet(context => context.User)
                .Returns(claimsPrincipal);

            _mock.Mock<IHttpContextAccessor>()
                .SetupGet(accessor => accessor.HttpContext)
                .Returns(httpContext);

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(provider => provider.IsTaken(email))
                .ReturnsAsync(false);

            var actual = await _validator.ValidateAsync(request);

            ContentAssert.AreEqual(new ValidationResult(), actual);
        }
    }
}
