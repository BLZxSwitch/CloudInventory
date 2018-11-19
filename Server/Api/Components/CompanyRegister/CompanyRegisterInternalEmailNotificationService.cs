using Api.Components.EmailSender;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.CompanyRegister
{
    [As(typeof(ICompanyRegisterInternalEmailNotificationService))]
    public class CompanyRegisterInternalEmailNotificationService : ICompanyRegisterInternalEmailNotificationService
    {
        private readonly IEmailService _emailService;
        private readonly IInternalNotificationsConfiguration _internalNotificationsConfiguration;

        public CompanyRegisterInternalEmailNotificationService(
            IEmailService emailService,
            IInternalNotificationsConfiguration internalNotificationsConfiguration)
        {
            _emailService = emailService;
            _internalNotificationsConfiguration = internalNotificationsConfiguration;
        }

        public async Task SendAsync(User user)
        {
            if (_internalNotificationsConfiguration.CompanyRegistrationNotificationEmails.Count == 0) return;

            var company = user.SecurityUser.Employee.Company;
            var subject = "Зарегистрирована новая компания в CloudInventory";
            var content = $@"Компания { company.Name} была зарегистрирована в CloudInventory. Контактная информация:<br/>
                            {user.Email}<br/>
                            {company.Phone}<br/>
                            {company.Address}<br/>
                            {company.Zip} {company.City}";

            await _emailService.SendAsync(
                    new SendMultipleEmailsRequest
                    {
                        Emails = _internalNotificationsConfiguration.CompanyRegistrationNotificationEmails,
                        Subject = subject,
                        Content = content
                    });
        }
    }
}