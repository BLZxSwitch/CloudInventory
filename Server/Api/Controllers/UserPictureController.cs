using System;
using System.Threading.Tasks;
using Api.Components.CurrentUserProvider;
using Api.Components.Employees;
using Api.Components.Identities;
using Api.Components.UserSettings;
using Api.Filters.ModelStateFilter;
using Api.Transports.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserPictureController : ControllerBase
    {
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly Func<IEmployeeProvider> _employeeProviderFactory;
        private readonly ICurrentUserProvider _currentUserProvider;
        private readonly IUserPictureService _userPictureService;

        public UserPictureController(
            Func<IUserManager> userManagerFactory,
            Func<IEmployeeProvider> employeeProviderFactory,
            ICurrentUserProvider currentUserProvider,
            IUserPictureService userPictureService)
        {
            _userManagerFactory = userManagerFactory;
            _employeeProviderFactory = employeeProviderFactory;
            _currentUserProvider = currentUserProvider;
            _userPictureService = userPictureService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserPicture()
        {
            var user = await _currentUserProvider.GetUserAsync(User);

            var fileStream = await _userPictureService.GetUserPictureStreamResult(user.SecurityUser);

            if (fileStream == null) return new NotFoundResult();

            return fileStream;
        }

        [HttpGet]
        [ModelStateFilter]
        public async Task<IActionResult> GetUserPictureByEmployeeId(Guid employeeId)
        {
            using (var employeeProvider = _employeeProviderFactory())
            {
                var employee = await employeeProvider.GetByIdAsync(employeeId);

                var fileStream = await _userPictureService.GetUserPictureStreamResult(employee.SecurityUser);

                if (fileStream == null) return new NotFoundResult();

                return fileStream;
            }
        }

        [HttpPost]
        public async Task<UserSettingsDTO> UploadUserPicture(IFormFile file)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                return await _userPictureService.UploadUserPictureAsync(userId, file);
            }
        }

        [HttpDelete]
        public async Task<UserSettingsDTO> DeleteUserPicture()
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                return await _userPictureService.DeleteUserPictureAsync(userId);
            }
        }
    }
}