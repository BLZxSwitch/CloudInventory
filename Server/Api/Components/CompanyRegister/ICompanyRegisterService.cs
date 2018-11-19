using System;
using System.Threading.Tasks;
using Api.Transports.CompanyRegister;

namespace Api.Components.CompanyRegister
{
    public interface ICompanyRegisterService
    {
        Task<Guid> Register(CompanyRegisterRequest request);
    }
}