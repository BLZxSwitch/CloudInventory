using Api.Components.CompanyRegister;
using Api.Components.EmailSender;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.CompanyRegister
{
    [TestClass]
    public class CompanyRegisterInternalEmailNotificationServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyRegisterInternalEmailNotificationService>();
        }

        [TestMethod]
        public async Task ShouldSendEmail()
        {
            var email = "email";
            var emails = new List<string>() { "email1", "email2" };
            var company = new Company();
            var employee = new Employee()
            {
                Company = company
            };
            var securityUser = new SecurityUser()
            {
                Employee = employee,
            };
            var user = new User()
            {
                SecurityUser = securityUser,
                Email = email,
            };

            var subject = "Зарегистрирована новая компания в CloudInventory";
            var content = $@"Компания { company.Name} была зарегистрирована в CloudInventory. Контактная информация:<br/>
                            {user.Email}<br/>
                            {company.Phone}<br/>
                            {company.Address}<br/>
                            {company.Zip} {company.City}";

            _mock.Mock<IInternalNotificationsConfiguration>()
                .SetupGet(configuration => configuration.CompanyRegistrationNotificationEmails)
                .Returns(emails);

            var service = _mock.Create<CompanyRegisterInternalEmailNotificationService>();

            await service.SendAsync(user);

            _mock.Mock<IEmailService>()
                .Verify(instance => instance.SendAsync(It.Is<SendMultipleEmailsRequest>(request => request.Content == content
                && request.Subject == subject
                && request.Emails == emails)));
        }

        [TestMethod]
        public async Task ShouldNotSendEmailWhenEmailsListIsEmpty()
        {
            var email = "email";
            var emails = new List<string>() { };
            var company = new Company();
            var employee = new Employee()
            {
                Company = company
            };
            var securityUser = new SecurityUser()
            {
                Employee = employee,
            };
            var user = new User()
            {
                SecurityUser = securityUser,
                Email = email,
            };

            _mock.Mock<IInternalNotificationsConfiguration>()
                .SetupGet(configuration => configuration.CompanyRegistrationNotificationEmails)
                .Returns(emails);

            var service = _mock.Create<CompanyRegisterInternalEmailNotificationService>();

            await service.SendAsync(user);

            _mock.Mock<IEmailService>()
                .Verify(instance => instance.SendAsync(It.IsAny<SendMultipleEmailsRequest>()), Times.Never);
        }
    }
}