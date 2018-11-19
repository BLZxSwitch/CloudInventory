using System.Threading.Tasks;
using Api.Components.Identities;
using Api.Transports.Common;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;

        public UserController(
            IMapper mapper,
            IUserManager userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<UserDTO> Me()
        {
            var userId = _userManager.GetUserId(User);

            var user = await _userManager.FindByIdAsync(userId);

            return _mapper.Map<UserDTO>(user);
        }
    }
}