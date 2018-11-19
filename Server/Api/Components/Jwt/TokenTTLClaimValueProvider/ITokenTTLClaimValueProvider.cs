namespace Api.Components.Jwt.TokenTTLClaimValueProvider
{
    public interface ITokenTTLClaimValueProvider
    {
        bool HasLongTimeToLive();
    }
}