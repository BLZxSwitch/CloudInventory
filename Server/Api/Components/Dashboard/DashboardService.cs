using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.Dashboard
{
    [As(typeof(IDashboardService))]
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardItemsService _dashboardItemService;
        private readonly ICurrentUserProvider _currentUserProvider;

        public DashboardService(IDashboardItemsService dashboardItemService,
            ICurrentUserProvider currentUserProvider)
        {
            _dashboardItemService = dashboardItemService;
            _currentUserProvider = currentUserProvider;
        }

        public async Task<DashboardSummaryResponse> GetSummaryAsync(ClaimsPrincipal principal)
        {
            var result = new DashboardSummaryResponse();

            var user = await _currentUserProvider.GetUserAsync(principal);

            var isCompanyAdministrator = user.IsCompanyAdministrator;
            var tenantId = user.SecurityUser.TenantId;

            if (isCompanyAdministrator)
            {
                result.HasOnlyAdminUsers = await _dashboardItemService.HasOnlyAdminUsers(tenantId);
            }
            return result;
        }
    }
}
