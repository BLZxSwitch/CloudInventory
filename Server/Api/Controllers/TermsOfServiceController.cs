using Api.Common.Exceptions;
using Api.Components.CurrentSecurityUser;
using Api.Components.TermsOfService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TermsOfServiceController : ControllerBase
    {
        private readonly ICurrentSecurityUserProvider _currentSecurityUserProvider;
        private readonly IUserToSService _userToSService;

        public TermsOfServiceController(
            IUserToSService userToSService, 
            ICurrentSecurityUserProvider currentSecurityUserProvider)
        {
            _userToSService = userToSService;
            _currentSecurityUserProvider = currentSecurityUserProvider;
        }

        [HttpPost]
        public async Task Accept(bool accepted)
        {
            if (!accepted)
            {
                throw new BadRequestException("MUST_BE_ACCEPTED");
            }

            var securityUserId = await _currentSecurityUserProvider.GetSecurityUserIdAsync(User);

            await _userToSService.AcceptAsync(securityUserId);
        }
    }
}