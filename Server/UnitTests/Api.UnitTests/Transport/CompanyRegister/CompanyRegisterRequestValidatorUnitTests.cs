using Api.Components.CompanyNameIsTaken;
using Api.Components.EmailTaken;
using Api.Transports.CompanyRegister;
using Autofac.Extras.Moq;
using FluentValidation.Results;
using FluentValidation.Validators;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Linq;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Transport.CompanyRegister
{
    [TestClass]
    public class CompanyRegisterRequestValidatorUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyRegisterRequestValidator>();
        }

        [TestMethod]
        public void HasAppropriateValidators()
        {
            var validator = _mock.Create<CompanyRegisterRequestValidator>();
            validator
                .HasPropertyRule(request => request.CompanyName)
                .HasValidator<NotEmptyValidator, AsyncPredicateValidator>();

            validator
                .HasPropertyRule(request => request.FirstName)
                .HasValidator<NotEmptyValidator>();

            validator
                .HasPropertyRule(request => request.LastName)
                .HasValidator<NotEmptyValidator>();

            validator
                .HasPropertyRule(request => request.Email)
                .HasValidator<EmailValidator, AsyncPredicateValidator>();

            validator
                .HasPropertyRule(request => request.Password)
                .HasValidator<NotEmptyValidator>();

            validator
                .HasPropertyRule(request => request.ValidationToken)
                .HasValidator<NotEmptyValidator>();
        }

        [TestMethod]
        public async Task ReturnsValidWhenModelIsValid()
        {
            const string companyName = "company name";
            const string companyPhone = "companyPhone";
            const string firstName = "First Name";
            const string email = "email@m.m";
            const string lastName = "Last Name";
            const string password = "Password";
            const string validationToken = "validation token";

            var request = new CompanyRegisterRequest
            {
                CompanyName = companyName,
                CompanyPhone = companyPhone,
                FirstName = firstName,
                Email = email,
                LastName = lastName,
                Password = password,
                ValidationToken = validationToken,
                ToSAccepted = true,
            };

            _mock.Mock<ICompanyNameIsTakenProvider>()
                .Setup(context => context.IsTaken(companyName))
                .ReturnsAsync(false);

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(context => context.IsTaken(email))
                .ReturnsAsync(false);

            var validator = _mock.Create<CompanyRegisterRequestValidator>();
            var actual = await validator.ValidateAsync(request);

            ContentAssert.AreEqual(new ValidationResult(), actual);
        }

        [TestMethod]
        public async Task ReturnsErrorWhenCompanyNameIsAlreadyTaken()
        {
            const string companyName = "Company name";

            var request = new CompanyRegisterRequest
            {
                CompanyName = companyName
            };

            _mock.Mock<ICompanyNameIsTakenProvider>()
                .Setup(context => context.IsTaken(companyName))
                .ReturnsAsync(true);

            var validator = _mock.Create<CompanyRegisterRequestValidator>();
            var actual = await validator
                .PropertyContext(request, model => model.CompanyName)
                .ValidateAsync<AsyncPredicateValidator>();

            Assert.AreEqual(nameof(request.CompanyName), actual.Single().PropertyName);
        }

        [TestMethod]
        public async Task ReturnsErrorEmailIsAlreadyTaken()
        {
            const string email = "max@m.m";

            var request = new CompanyRegisterRequest
            {
                Email = email
            };

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(context => context.IsTaken(email))
                .ReturnsAsync(true);

            var validator = _mock.Create<CompanyRegisterRequestValidator>();
            var actual = await validator
                .PropertyContext(request, model => model.Email)
                .ValidateAsync<AsyncPredicateValidator>();

            Assert.AreEqual(nameof(request.Email), actual.Single().PropertyName);
        }
    }
}