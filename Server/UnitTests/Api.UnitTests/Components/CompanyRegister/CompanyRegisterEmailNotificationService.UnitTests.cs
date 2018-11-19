using Api.Components.CompanyRegister;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Api.Components.Culture;
using Api.Components.EmailSender;
using Microsoft.Extensions.Localization;
using Moq;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.CompanyRegister
{
    [TestClass]
    public class CompanyRegisterEmailNotificationServiceUnitTests
    {
        private AutoMock _mock;
        private CompanyRegisterEmailNotificationService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _service = _mock.Create<CompanyRegisterEmailNotificationService>();
        }

        [TestMethod]
        public async Task SendsWellcomeEmail()
        {
            var firstName = "first name";
            var lastName = "last name";
            var companyName = "company name";
            var userEmail = "user email";
            var user = new User
            {
                Email = userEmail,
                SecurityUser = new SecurityUser
                {
                    Employee = new Employee
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Company = new Company
                        {
                            Name = companyName
                        }
                    }
                }
            };

            var emailSubject = "email subject {0} {1}";
            var emailBody = "email body {0} {1} {2}";

            var localizedStringSubject = new LocalizedString("COMPANY_REGISTER_EMAIL_SUBJECT", emailSubject);
            var localizedStringBody = new LocalizedString("COMPANY_REGISTER_EMAIL_BODY", emailBody);

            _mock.Mock<IStringLocalizer<CompanyRegisterEmailNotificationService>>()
                .SetupGet(context => context["COMPANY_REGISTER_EMAIL_SUBJECT"])
                .Returns(localizedStringSubject);

            _mock.Mock<IStringLocalizer<CompanyRegisterEmailNotificationService>>()
                .SetupGet(context => context["COMPANY_REGISTER_EMAIL_BODY"])
                .Returns(localizedStringBody);

            var localizer = _mock.Mock<IStringLocalizer<CompanyRegisterEmailNotificationService>>().Object;

            _mock.Mock<IUserLocalizerProvider<CompanyRegisterEmailNotificationService>>()
                .Setup(instance => instance.Get(user.SecurityUser))
                .Returns(localizer);

            await _service.SendAsync(user);

            var emailRequest = new SendSingleEmailRequest
            {
                Email = userEmail,
                Subject = string.Format(emailSubject, firstName, lastName),
                Content = string.Format(emailBody, firstName, lastName, companyName),
            };
            _mock.Mock<IEmailService>()
                .Verify(context => context.SendAsync(
                    It.Is<SendSingleEmailRequest>(value => ContentAssert.IsEqual(emailRequest, value))));
        }
    }
}
