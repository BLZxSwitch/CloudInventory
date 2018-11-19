using System.Collections.Generic;

namespace Api.Transports.PushSubscriptions
{
    public class PushSubscriptionDTO
    {
        public string Endpoint { get; set; }
        
        public string Auth { get; set; }

        public string P256DH { get; set; }
    }
}
