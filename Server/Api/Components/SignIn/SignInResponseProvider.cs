using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using System;
using Api.Transports.SignIn;
using System.Threading.Tasks;
using Api.Components.Jwt.CreateJwtTokenAsStringService;
using Api.Components.Identities;
using Api.Transports.Common;
using AutoMapper;

namespace Api.Components.SignIn
{
    [As(typeof(ISignInResponseProvider))]
    public class SignInResponseProvider : ISignInResponseProvider
    {
        private readonly ICreateJwtTokenAsStringService _createJwtTokenAsStringService;
        private readonly IUserManager _userManager;
        private readonly IMapper _mapper;

        public SignInResponseProvider(
            ICreateJwtTokenAsStringService createJwtTokenAsStringService,
            IUserManager userManager,
            IMapper mapper)
        {
            _createJwtTokenAsStringService = createJwtTokenAsStringService;
            _userManager = userManager;
            _mapper = mapper;
        }

        public SignInResponse Get(User user, bool rememberMe)
        {
            var userDTO = _mapper.Map<UserDTO>(user);

            var token = _createJwtTokenAsStringService.Create(user.Id, rememberMe, userDTO.Roles);

            return new SignInResponse
            {
                Token = token,
                User = userDTO,
            };
        }

        public async Task<SignInResponse> GetAsync(Guid userId, bool rememberMe)
        {
            var user = await _userManager.FindByIdAsync(userId);

            return Get(user, rememberMe);
        }
    }
}
