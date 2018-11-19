using System.Threading.Tasks;

namespace Api.Components.Otp
{
    public interface IOtpLinkRequestProvider
    {
        Task<OtpLinkRequest> GetAsync();
    }
}