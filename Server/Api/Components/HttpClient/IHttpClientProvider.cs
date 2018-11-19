using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Api.Components.HttpClient
{
    public interface IHttpClientProvider : IDisposable
    {
        Task<HttpResponseMessage> PostAsync(string uri, FormUrlEncodedContent formContent);
    }
}