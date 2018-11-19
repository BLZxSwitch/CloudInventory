using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;
using System.Collections.Specialized;
using System.Web;

namespace Api.Common
{
    [As(typeof(IClientUriService))]
    public class ClientUriService : IClientUriService
    {
        private readonly ICommonConfiguration _commonConfiguration;

        public ClientUriService(ICommonConfiguration commonConfiguration)
        {
            _commonConfiguration = commonConfiguration;
        }

        public string BuildUri(string relativeUri, NameValueCollection queryParams)
        {
            var parameters = HttpUtility.ParseQueryString(string.Empty);

            parameters.Add(queryParams);

            var uriBuilder = new UriBuilder(new Uri(new Uri(_commonConfiguration.ClientBaseUrl), relativeUri))
            {
                Query = parameters.ToString()
            };

            return uriBuilder.Uri.ToString();
        }
    }
}
