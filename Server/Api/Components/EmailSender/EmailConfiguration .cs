using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.EmailSender
{
    [As(typeof(IEmailConfiguration))]
    public class EmailConfiguration : IEmailConfiguration
    {
        public string ApiKey { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
    }
}
