using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System.Collections.Generic;
using System.Linq;

namespace Api.Components.CompanyRegister
{
    [As(typeof(IInternalNotificationsConfiguration))]
    public class InternalNotificationsConfiguration : IInternalNotificationsConfiguration
    {
        public string CompanyRegistrationNotificationEmailsList { get; set; }

        public List<string> CompanyRegistrationNotificationEmails
        {
            get
            {
                return CompanyRegistrationNotificationEmailsList
                    .Split(',')
                    .Distinct()
                    .ToList();
            }
        }
    }
}
