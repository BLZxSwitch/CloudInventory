using System.Collections.Specialized;
using System.Net;
using System.Threading.Tasks;
using Api.Common;
using Api.Common.Exceptions;
using Api.Components.EmailSender;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;

namespace Api.Components.SetPasswordEmail
{
    [As(typeof(ISetPasswordEmailService))]
    public class SetPasswordEmailService : ISetPasswordEmailService
    {
        private readonly IClientUriService _clientUriService;
        private readonly IEmailService _emailService;

        public SetPasswordEmailService(
            IClientUriService clientUriService,
            IEmailService emailService)
        {
            _clientUriService = clientUriService;
            _emailService = emailService;
        }

        public async Task GenerateAndSendTokenAsync(User user, string token, string clientUrl, string subject, string body)
        {
            var clientLink = _clientUriService.BuildUri(clientUrl, new NameValueCollection
            {
                {"userId", user.Id.ToString()},
                {"code", token}
            });
            
            var response = await _emailService.SendAsync(
                new SendSingleEmailRequest()
                {
                    Email = user.Email,
                    Subject = subject,
                    Content = string.Format(body, clientLink)
                });

            if (response.StatusCode != HttpStatusCode.Accepted)
                throw new CanNotSendEmailException(response.StatusCode.ToString());
        }
    }
}