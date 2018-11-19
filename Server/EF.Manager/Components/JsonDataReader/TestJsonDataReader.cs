using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace EF.Manager.Components.JsonDataReader
{
    [As(typeof(ITestJsonDataReader<>))]
    public class TestJsonDataReader<T> : JsonDataReader<T>, ITestJsonDataReader<T>
    {
        public T Read(string fileName)
        {
            return Read("TestSeeding", fileName);
        }
    }
}