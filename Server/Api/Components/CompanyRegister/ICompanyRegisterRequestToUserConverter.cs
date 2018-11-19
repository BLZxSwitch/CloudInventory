using Api.Transports.CompanyRegister;
using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.CompanyRegister
{
    public interface ICompanyRegisterRequestToUserConverter
    {
        User Convert(CompanyRegisterRequest request);
    }
}