using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System.Net.Http;
using System.Threading.Tasks;

namespace Api.Components.HttpClient
{
    [As(typeof(IHttpClientProvider))]
    class HttpClientProvider : IHttpClientProvider
    {
        private readonly System.Net.Http.HttpClient _httpClient = new System.Net.Http.HttpClient();

        public Task<HttpResponseMessage> PostAsync(string uri, FormUrlEncodedContent formContent)
        {
            return _httpClient.PostAsync(uri, formContent);
        }

        public void Dispose()
        {
            _httpClient.Dispose();
        }
    }
}