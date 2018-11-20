using System.Threading.Tasks;
using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using Moq;
using Api.Components.CurrentUserProvider;
using Api.Components.UserSettings;
using EF.Models.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System;
using Api.Components.Employees;
using Microsoft.AspNetCore.Http;
using Api.Components.Identities;
using Api.Transports.Common;
using System.Security.Claims;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class UserPictureControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldReturnUserPictureStreamOfCurrentUser()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            using (var memoryStream = new MemoryStream())
            {
                var expected = new FileStreamResult(memoryStream, "image/pdf");

                var securityUser = new SecurityUser();

                var user = new User()
                {
                    SecurityUser = securityUser
                };

                var controller = _mock.Create<UserPictureController>();
                controller.ControllerContext = controllerContext;

                _mock.Mock<IUserPictureService>()
                    .Setup(service => service.GetUserPictureStreamResult(securityUser))
                    .ReturnsAsync(expected);

                _mock.Mock<ICurrentUserProvider>()
                    .Setup(provider => provider.GetUserAsync(controller.User))
                    .ReturnsAsync(user);

                var actual = await controller.GetUserPicture();

                ContentAssert.AreEqual(expected, actual);
            }
        }

        [TestMethod]
        public async Task ShouldReturnNotFoundWhenPictureDoesNotExists()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            var expected = new NotFoundResult();

            var securityUser = new SecurityUser();

            var user = new User()
            {
                SecurityUser = securityUser
            };

            var controller = _mock.Create<UserPictureController>();
            controller.ControllerContext = controllerContext;

            _mock.Mock<IUserPictureService>()
                .Setup(service => service.GetUserPictureStreamResult(securityUser))
                .ReturnsAsync(null as FileStreamResult);

            _mock.Mock<ICurrentUserProvider>()
                .Setup(provider => provider.GetUserAsync(controller.User))
                .ReturnsAsync(user);

            var actual = await controller.GetUserPicture();

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnUserPictureStreamOfByEmployeeId()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            using (var memoryStream = new MemoryStream())
            {
                Guid employeeId = Guid.NewGuid();

                var securityUser = new SecurityUser();

                var employee = new Employee()
                {
                    SecurityUser = securityUser
                };

                var expected = new FileStreamResult(memoryStream, "image/pdf");

                var controller = _mock.Create<UserPictureController>();
                controller.ControllerContext = controllerContext;

                _mock.Mock<IEmployeeProvider>()
                    .Setup(provider => provider.GetByIdAsync(employeeId))
                    .ReturnsAsync(employee);

                _mock.Mock<IUserPictureService>()
                    .Setup(service => service.GetUserPictureStreamResult(securityUser))
                    .ReturnsAsync(expected);

                var actual = await controller.GetUserPictureByEmployeeId(employeeId);

                ContentAssert.AreEqual(expected, actual);
            }
        }

        [TestMethod]
        public async Task ShouldReturnNotFoundWhenEmplayeesPictureDoesNotExists()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            var expected = new NotFoundResult();

            Guid employeeId = Guid.NewGuid();

            var securityUser = new SecurityUser();

            var employee = new Employee()
            {
                SecurityUser = securityUser
            };

            var controller = _mock.Create<UserPictureController>();
            controller.ControllerContext = controllerContext;

            _mock.Mock<IEmployeeProvider>()
                .Setup(provider => provider.GetByIdAsync(employeeId))
                .ReturnsAsync(employee);

            _mock.Mock<IUserPictureService>()
                .Setup(service => service.GetUserPictureStreamResult(securityUser))
                .ReturnsAsync(null as FileStreamResult);

            var actual = await controller.GetUserPictureByEmployeeId(employeeId);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldUploadUserPicture()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            var userId = Guid.NewGuid();
            var file = _mock.Mock<IFormFile>().Object;

            var expected = new UserSettingsDTO();

            var controller = _mock.Create<UserPictureController>();
            controller.ControllerContext = controllerContext;

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(controller.User))
                .Returns(userId);

            _mock.Mock<IUserPictureService>()
                .Setup(service => service.UploadUserPictureAsync(userId, file))
                .ReturnsAsync(expected);

            var actual = await controller.UploadUserPicture(file);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldDeleteUserPicture()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };
            var userId = Guid.NewGuid();

            var expected = new UserSettingsDTO();
            
            var controller = _mock.Create<UserPictureController>();
            controller.ControllerContext = controllerContext;

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(controller.User))
                .Returns(userId);

            _mock.Mock<IUserPictureService>()
                .Setup(service => service.DeleteUserPictureAsync(userId))
                .ReturnsAsync(expected);

            var actual = await controller.DeleteUserPicture();

            ContentAssert.AreEqual(expected, actual);
        }
    }
}