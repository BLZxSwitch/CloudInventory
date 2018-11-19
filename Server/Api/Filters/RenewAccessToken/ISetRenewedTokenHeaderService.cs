namespace Api.Filters.RenewAccessToken
{
    public interface ISetRenewedTokenHeaderService
    {
        void SetValue(string renewedToken);
    }
}