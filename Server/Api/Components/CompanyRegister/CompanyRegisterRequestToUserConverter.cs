using Api.Components.GuidsProviders;
using Api.Transports.CompanyRegister;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;

namespace Api.Components.CompanyRegister
{
    [As(typeof(ICompanyRegisterRequestToUserConverter))]
    internal class CompanyRegisterRequestToUserConverter : ICompanyRegisterRequestToUserConverter
    {
        private readonly INewGuidProvider _newGuidProvider;

        public CompanyRegisterRequestToUserConverter(INewGuidProvider newGuidProvider)
        {
            _newGuidProvider = newGuidProvider;
        }

        public User Convert(CompanyRegisterRequest request)
        {
            var company = new Company
            {
                Name = request.CompanyName,
                Phone = request.CompanyPhone,
                Address = request.Address,
                City = request.City,
                Zip = request.Zip,
            };

            var tenant = new Tenant
            {
                IsActive = true,
                Name = request.CompanyName,
                Company = company,
            };

            return new User
            {
                UserName = request.Email,
                Email = request.Email,
                SecurityUser = new SecurityUser
                {
                    Tenant = tenant,
                    IsActive = true,
                    IsInvited = true,
                    IsInvitationAccepted = true,
                    Employee = new Employee
                    {
                        Company = company,
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        PatronymicName = request.PatronymicName,
                        Gender = request.Gender,
                        DateOfBirth = request.DateOfBirth,
                        Tenant = tenant,
                    }
                },
                ConcurrencyStamp = _newGuidProvider.Get().ToString()
            };
        }
    }
}