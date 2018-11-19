using Api.Components.Culture;
using Api.Components.EmailSender;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.CompanyRegister
{
    [As(typeof(ICompanyRegisterEmailNotificationService))]
    public class CompanyRegisterEmailNotificationService : ICompanyRegisterEmailNotificationService
    {
        private readonly IUserLocalizerProvider<CompanyRegisterEmailNotificationService> _userLocalizerProvider;
        private readonly IEmailService _emailService;

        public CompanyRegisterEmailNotificationService(
            IUserLocalizerProvider<CompanyRegisterEmailNotificationService> userLocalizerProvider,
            IEmailService emailService)
        {
            _emailService = emailService;
            _userLocalizerProvider = userLocalizerProvider;
        }

        public async Task SendAsync(User user)
        {
            var localizer = _userLocalizerProvider.Get(user.SecurityUser);

            var employee = user.SecurityUser.Employee;
            var subject = string.Format(localizer["COMPANY_REGISTER_EMAIL_SUBJECT"],
                employee.FirstName,
                employee.LastName,
                employee.Company.Name);
            var content = string.Format(localizer["COMPANY_REGISTER_EMAIL_BODY"],
                employee.FirstName,
                employee.LastName,
                employee.Company.Name);

            await _emailService.SendAsync(
                new SendSingleEmailRequest
                {
                    Email = user.Email,
                    Subject = subject,
                    Content = content
                });
        }
    }
}