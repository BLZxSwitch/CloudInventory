namespace Api.Components.Jwt
{
    public class JwtTokenOptions
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public int ExpireDaysLongToken { get; set; }
        public int ExpireMinutesShortToken { get; set; }
    }
}