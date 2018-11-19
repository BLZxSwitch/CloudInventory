using System.Threading.Tasks;

namespace EF.Manager.Components
{
    public interface IStartable
    {
        Task StartAsync();
    }
}