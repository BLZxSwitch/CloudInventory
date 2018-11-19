using System.Collections.Generic;

namespace Api.Components.EmailSender
{
    public class SendMultipleEmailsRequest
    {
        public List<string> Emails { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }
    }
}
