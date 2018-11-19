using Api.Components.EmailSender;
using System;

namespace Api.Components.Ics
{
    public interface IApprovedHolidayIcsAttachmentProvider
    {
        SendEmailRequestAttachment Get(string name, DateTime start, DateTime end, bool toSelf);
    }
}