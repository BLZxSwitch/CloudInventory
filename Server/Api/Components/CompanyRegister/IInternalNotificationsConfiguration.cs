using System.Collections.Generic;

namespace Api.Components.CompanyRegister
{
    public interface IInternalNotificationsConfiguration
    {
        string CompanyRegistrationNotificationEmailsList { get; set; }

        List<string> CompanyRegistrationNotificationEmails { get; }
    }
}