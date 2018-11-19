namespace Api.Filters.RenewAccessToken
{
    public interface IEndpointProvider
    {
        bool IsProtected();
    }
}
