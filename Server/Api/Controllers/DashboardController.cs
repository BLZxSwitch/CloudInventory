using System.Threading.Tasks;
using Api.Components.Dashboard;
using Api.Filters.ModelStateFilter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<DashboardSummaryResponse> GetSummary()
        {
            return await _dashboardService.GetSummaryAsync(User);
        }
    }
}
