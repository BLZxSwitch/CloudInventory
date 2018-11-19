namespace Api.Components
{
    public static class ProjectClaims
    {
        public static string JwtTokenHasLongTimeToLiveClaimName = "http://2bit.ch/claims/JwtTokenHasLongTimeToLive";
        public static string OtpTokenSecretKeyClaimName = "http://2bit.ch/claims/OtpTokenSecretKey";
        public static string OtpAuthTokenClaimName = "http://2bit.ch/claims/OtpAuthToken";
    }
}