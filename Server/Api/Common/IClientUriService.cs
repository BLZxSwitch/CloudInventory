using System.Collections.Specialized;

namespace Api.Common
{
    public interface IClientUriService
    {
        string BuildUri(string relativeUri, NameValueCollection queryParams);
    }
}
