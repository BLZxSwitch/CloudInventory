using System.Threading.Tasks;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using Moq;
using Api.Components.UserSettings;
using EF.Models.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System;
using Api.Transports.Common;
using Api.Components.SecurityUsers;
using AutoMapper;
using EF.Models;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace Api.UnitTests.Components
{
    [TestClass]
    public class UserPictureServiceUnitTests
    {
        private AutoMock _mock;

        private UserPictureService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<UserPictureService>();
        }

        [TestMethod]
        public async Task ShouldReturnUserPictureStream()
        {
            //using (var memoryStream = new MemoryStream())
            //{
            //    var expected = new FileStreamResult(memoryStream, "image/pdf");

            //    var userPictureId = Guid.NewGuid();

            //    var securityUser = new SecurityUser()
            //    {
            //        UserPictureId = userPictureId
            //    };

            //    _mock.Mock<IStorageService>()
            //        .Setup(service => service.GetFileStreamResultAsync(userPictureId, false))
            //        .ReturnsAsync(expected);

            //    var actual = await _service.GetUserPictureStreamResult(securityUser);

            //    ContentAssert.AreEqual(expected, actual);
            //}
        }

        [TestMethod]
        public async Task ShouldReturnNullWhenUserPictureIdIsNull()
        {
            //FileStreamResult expected = null;

            //var securityUser = new SecurityUser()
            //{
            //    UserPictureId = null
            //};

            //var actual = await _service.GetUserPictureStreamResult(securityUser);

            //ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldDeleteUserPicture()
        {
            //var userId = Guid.NewGuid();
            //var userPicture = new AzureBlob();

            //var securityUser = new SecurityUser()
            //{
            //    UserPicture = userPicture,
            //};

            //var expected = new UserSettingsDTO(); ;

            //_mock.Mock<ISecurityUserProvider>()
            //    .Setup(service => service.GetByUserIdAsync(userId))
            //    .ReturnsAsync(securityUser);

            //_mock.Mock<IMapper>()
            //    .Setup(mapper => mapper.Map<UserSettingsDTO>(securityUser))
            //    .Returns(expected);

            //var actual = await _service.DeleteUserPictureAsync(userId);

            //_mock.Mock<IStorageService>()
            //    .Verify(service => service.DeleteFileAsync(userPicture));

            //_mock.Mock<IPayrollContext>()
            //    .Verify(context => context.SaveChangesAsync(default(CancellationToken)));

            //ContentAssert.AreEqual(expected, actual);
        }
        
        [TestMethod]
        public async Task ShouldUploadUserPicture()
        {
            //var userId = Guid.NewGuid();
            //var azureBlobId = Guid.NewGuid();
            //var tenantId = Guid.NewGuid();
            //var userPicture = new AzureBlob();
            //var file = _mock.Mock<IFormFile>().Object;

            //var securityUser = new SecurityUser()
            //{
            //    TenantId = tenantId,
            //    UserPicture = userPicture,
            //};
            //var azureBlob = new AzureBlob()
            //{
            //    Id = azureBlobId,
            //};

            //var expected = new UserSettingsDTO(); ;

            //_mock.Mock<ISecurityUserProvider>()
            //    .Setup(service => service.GetByUserIdAsync(userId))
            //    .ReturnsAsync(securityUser);

            //_mock.Mock<IMapper>()
            //    .Setup(mapper => mapper.Map<UserSettingsDTO>(securityUser))
            //    .Returns(expected);

            //_mock.Mock<IStorageService>()
            //    .Setup(service => service.UploadFileAsync(tenantId, "user-pictures", file, false))
            //    .ReturnsAsync(azureBlob);
            
            //var actual = await _service.UploadUserPictureAsync(userId, file);

            //_mock.Mock<IStorageService>()
            //    .Verify(service => service.DeleteFileAsync(userPicture));
            
            //_mock.Mock<IPayrollContext>()
            //    .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Exactly(2));

            //ContentAssert.AreEqual(expected, actual);
        }
    }
}