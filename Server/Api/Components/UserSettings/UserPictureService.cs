using Api.Components.Identities;
using Api.Components.SecurityUsers;
using Api.Transports.Common;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Components.UserSettings
{
    [As(typeof(IUserPictureService))]
    public class UserPictureService : IUserPictureService
    {
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly Func<IInventContext> _contextFactory;
        private readonly IMapper _mapper;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;

        public UserPictureService(Func<IUserManager> userManagerFactory,
            Func<IInventContext> contextFactory,
            IMapper mapper,
            Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory)
        {
            _userManagerFactory = userManagerFactory;
            _contextFactory = contextFactory;
            _mapper = mapper;
            _securityUserProviderFactory = securityUserProviderFactory;
        }

        public async Task<UserSettingsDTO> UploadUserPictureAsync(Guid userId, IFormFile file)
        {
            return null;
            //using (var context = _contextFactory())
            //using (var securityUserProvider = _securityUserProviderFactory(context))
            //{
            //    var securityUser = await securityUserProvider.GetByUserIdAsync(userId);

            //    await DeleteUserPictureInternalAsync(securityUser);

            //    var azureBlob = await _storageService.UploadFileAsync(securityUser.TenantId, "user-pictures", file);

            //    securityUser.UserPictureId = azureBlob.Id;

            //    await context.SaveChangesAsync();

            //    return _mapper.Map<UserSettingsDTO>(securityUser);
            //}
        }

        public async Task<UserSettingsDTO> DeleteUserPictureAsync(Guid userId)
        {
            using (var context = _contextFactory())
            using (var securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await securityUserProvider.GetByUserIdAsync(userId);

                await DeleteUserPictureInternalAsync(securityUser);

                return _mapper.Map<UserSettingsDTO>(securityUser);
            }
        }

        public async Task<FileStreamResult> GetUserPictureStreamResult(SecurityUser securityUser)
        {
            return null;
            //return securityUser.UserPictureId.HasValue
            //    ? await _storageService.GetFileStreamResultAsync(securityUser.UserPictureId.Value)
            //    : null;
        }

        private async Task DeleteUserPictureInternalAsync(SecurityUser securityUser)
        {
            //using (var context = _contextFactory())
            //{
                //var azureBlob = securityUser.UserPicture;

                //if (azureBlob == null) return;

                //securityUser.UserPicture = null;

                //await context.SaveChangesAsync();

                //await _storageService.DeleteFileAsync(azureBlob);
            //}
        }
    }
}
