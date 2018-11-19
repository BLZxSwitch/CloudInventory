using SendGrid;
using System.Threading.Tasks;

namespace Api.Components.EmailSender
{
    public interface IEmailService
    {
        Task<Response> SendAsync(SendSingleEmailRequest request);

        Task SendAsync(SendMultipleEmailsRequest request);
    }
}
