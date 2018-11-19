using System.Threading.Tasks;
using Api.Components.CompanyNameIsTaken;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CompanyNameTakenController : Controller
    {
        private readonly ICompanyNameIsTakenProvider _companyNameIsTakenProvider;

        public CompanyNameTakenController(
            ICompanyNameIsTakenProvider companyNameIsTakenProvider)
        {
            _companyNameIsTakenProvider = companyNameIsTakenProvider;
        }

        [HttpGet]
        public async Task<bool> IsTaken(string companyName)
        {
            return await _companyNameIsTakenProvider.IsTaken(companyName);
        }
    }
}