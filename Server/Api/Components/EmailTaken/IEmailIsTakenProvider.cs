using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.EmailTaken
{
    public interface IEmailIsTakenProvider
    {
        Task<bool> IsTaken(string email);

        Task<bool> IsTaken(string email, Guid selfEmployeeId);
    }
}