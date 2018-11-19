namespace Api.Filters.RenewAccessToken
{
    public interface IRequestMethodProvider
    {
        bool IsOptionsRequest();
    }
}