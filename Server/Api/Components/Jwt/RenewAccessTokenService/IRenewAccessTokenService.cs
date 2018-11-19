namespace Api.Components.Jwt.RenewAccessTokenService
{
    public interface IRenewAccessTokenService
    {
        string Renew(string outdatedToken);
    }
}