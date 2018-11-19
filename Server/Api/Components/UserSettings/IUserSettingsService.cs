using Api.Transports.Common;
using System;
using System.Threading.Tasks;

namespace Api.Components.UserSettings
{
    public interface IUserSettingsService
    {
        Task<UserSettingsDTO> UpdateAsync(UserSettingsDTO userSettings, Guid userId);
    }
}