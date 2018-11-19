using Api.Transports.SignIn;
using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.SignIn
{
    public interface ISignInResponseProvider
    {
        SignInResponse Get(User user, bool rememberMe);

        Task<SignInResponse> GetAsync(Guid userId, bool rememberMe);
    }
}
