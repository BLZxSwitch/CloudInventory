using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Components.EmailSender
{
    [As(typeof(IEmailService))]
    public class EmailService : IEmailService
    {
        private readonly IEmailConfiguration _emailConfiguration;
        private readonly ISendGridClient _sendGridClient;

        public EmailService(IEmailConfiguration emailConfiguration, ISendGridClient sendGridClient)
        {
            _emailConfiguration = emailConfiguration;
            _sendGridClient = sendGridClient;
        }

        public async Task<Response> SendAsync(SendSingleEmailRequest request)
        {
            var from = new EmailAddress(_emailConfiguration.SenderEmail, _emailConfiguration.SenderName);
            var to = new EmailAddress(request.Email);
            var msg = MailHelper.CreateSingleEmail(from, to, request.Subject, request.Content, request.Content);

            if (request.Attachments != null)
            {
                var attachments = request.Attachments.Select(a => new Attachment()
                {
                    Type = a.Type,
                    Filename = a.Filename,
                    Content = a.Content,
                })
                .ToList();
                msg.AddAttachments(attachments);
            }
            
            return await _sendGridClient.SendEmailAsync(msg);
        }

        public async Task SendAsync(SendMultipleEmailsRequest request)
        {
            var from = new EmailAddress(_emailConfiguration.SenderEmail, _emailConfiguration.SenderName);
            var tos =request.Emails.Select(email=> new EmailAddress(email)).ToList();
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, request.Subject, request.Content, request.Content, true);

            await _sendGridClient.SendEmailAsync(msg);
        }
    }
}
