using Api.Components.EmailSender;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net.Serialization;
using System;
using System.Text;

namespace Api.Components.Ics
{
    [As(typeof(IApprovedHolidayIcsAttachmentProvider))]
    public class ApprovedHolidayIcsAttachmentProvider : IApprovedHolidayIcsAttachmentProvider
    {
        public SendEmailRequestAttachment Get(string name, DateTime start, DateTime end, bool toSelf)
        {
            var e = new CalendarEvent
            {
                Summary = name,
                Start = new CalDateTime(ToUtc(start)),
                End = new CalDateTime(ToUtc(end.AddDays(1))), 
            };
            e.AddProperty(new CalendarProperty("X-MICROSOFT-CDO-ALLDAYEVENT", "TRUE"));
            e.AddProperty(new CalendarProperty("X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT", "TRUE"));
            if (toSelf)
            {
                e.AddProperty(new CalendarProperty("X-MICROSOFT-CDO-BUSYSTATUS", "OOF"));
                e.AddProperty(new CalendarProperty("X-MICROSOFT-CDO-INTENDEDSTATUS", "OOF"));
            }
            else
            {
                e.AddProperty(new CalendarProperty("X-MICROSOFT-CDO-BUSYSTATUS", "FREE"));
                e.AddProperty(new CalendarProperty("X-MICROSOFT-CDO-INTENDEDSTATUS", "FREE"));
            }

            var calendar = new Calendar()
            {
                Method = "REQUEST"
            };
            calendar.Events.Add(e);

            var serializer = new CalendarSerializer();
            var serializedCalendar = serializer.SerializeToString(calendar);
            var plainTextBytes = Encoding.UTF8.GetBytes(serializedCalendar);

            return new SendEmailRequestAttachment()
            {
                Content = Convert.ToBase64String(plainTextBytes),
                Type = "text/calendar; method=REQUEST",
                Filename = "invite.ics",
            };
        }

        private DateTime ToUtc(DateTime value)
        {
            return new DateTime(value.Year, value.Month, value.Day, value.Hour, value.Minute, value.Second, DateTimeKind.Utc);
        }
    }
}
