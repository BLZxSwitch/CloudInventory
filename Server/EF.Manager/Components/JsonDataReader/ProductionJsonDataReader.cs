using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace EF.Manager.Components.JsonDataReader
{
    [As(typeof(IProductionJsonDataReader<>))]
    public class ProductionJsonDataReader<T> : JsonDataReader<T>, IProductionJsonDataReader<T>
    {
        public T Read(string fileName)
        {
            return Read("ProductionSeeding", fileName);
        }
    }
}