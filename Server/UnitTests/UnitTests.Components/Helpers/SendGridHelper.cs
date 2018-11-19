using System.Net;
using System.Net.Http;
using SendGrid;

namespace UnitTests.Components.Helpers
{
    public static class SendGridHelper
    {
        public static Response GetEmptyResponse(HttpStatusCode statusCode)
        {
            var httpResponse = new HttpResponseMessage();
            return new Response(statusCode, httpResponse.Content, httpResponse.Headers);
        }
    }
}
