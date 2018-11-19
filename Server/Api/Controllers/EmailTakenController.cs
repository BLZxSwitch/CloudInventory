using System;
using System.Threading.Tasks;
using Api.Components.EmailTaken;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class EmailTakenController : Controller
    {
        private readonly IEmailIsTakenProvider _emailIsTakenProvider;

        public EmailTakenController(IEmailIsTakenProvider emailIsTakenProvider)
        {
            _emailIsTakenProvider = emailIsTakenProvider;
        }

        [HttpGet]
        public async Task<bool> IsTaken(string email, Guid? selfEmployeeId = null)
        {
            return selfEmployeeId.HasValue
                ? await _emailIsTakenProvider.IsTaken(email, selfEmployeeId.Value)
                : await _emailIsTakenProvider.IsTaken(email);
        }
    }
}