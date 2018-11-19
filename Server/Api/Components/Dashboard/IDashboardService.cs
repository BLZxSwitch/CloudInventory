using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardSummaryResponse> GetSummaryAsync(ClaimsPrincipal principal);
    }
}