using Api.Transports.Common;
using EF.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Components.UserSettings
{
    public interface IUserPictureService
    {
        Task<UserSettingsDTO> UploadUserPictureAsync(Guid userId, IFormFile file);

        Task<FileStreamResult> GetUserPictureStreamResult(SecurityUser securityUser);

        Task<UserSettingsDTO> DeleteUserPictureAsync(Guid userId);
    }
}