using System.Threading.Tasks;

namespace Api.Components.CompanyNameIsTaken
{
    public interface ICompanyNameIsTakenProvider
    {
        Task<bool> IsTaken(string companyName);
    }
}