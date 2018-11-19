using System;
using System.Threading.Tasks;
using Api.Components.Identities;
using Api.Components.SecurityUsers;
using Api.Components.UserSettings;
using Api.Transports.Common;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserSettingsController : ControllerBase
    {
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly IUserSettingsService _userSettingsService;
        private readonly ISecurityUserProvider _securityUserProvider;
        private readonly IMapper _mapper;

        public UserSettingsController(
            Func<IUserManager> userManagerFactory,
            IUserSettingsService userSettingsService,
            ISecurityUserProvider securityUserProvider,
            IMapper mapper)
        {
            _userManagerFactory = userManagerFactory;
            _userSettingsService = userSettingsService;
            _securityUserProvider = securityUserProvider;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<UserSettingsDTO> Get()
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                var securityUser = await _securityUserProvider.GetByUserIdAsync(userId);

                return _mapper.Map<UserSettingsDTO>(securityUser);
            }
        }

        [HttpPut]
        public async Task<UserSettingsDTO> Update([FromBody]UserSettingsDTO userSettings)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                return await _userSettingsService.UpdateAsync(userSettings, userId);
            }
        }
    }
}