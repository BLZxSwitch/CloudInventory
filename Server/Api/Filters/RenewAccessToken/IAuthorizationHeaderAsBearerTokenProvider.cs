namespace Api.Filters.RenewAccessToken
{
    public interface IAuthorizationHeaderAsBearerTokenProvider
    {
        string AsBearerToken();
    }
}