using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;

namespace Api.Filters.RenewAccessToken
{
    [As(typeof(ISetRenewedTokenHeaderService))]
    internal class SetRenewedTokenHeaderService : ISetRenewedTokenHeaderService
    {
        public const string RenewedTokenHeaderName = "X-Renewed-Token";
        private readonly HttpContext _context;

        public SetRenewedTokenHeaderService(HttpContext context)
        {
            _context = context;
        }

        public void SetValue(string renewedToken)
        {
            _context.Response.Headers.Add(RenewedTokenHeaderName, renewedToken);
            _context.Response.Headers.Add("Access-Control-Expose-Headers", RenewedTokenHeaderName);
        }
    }
}