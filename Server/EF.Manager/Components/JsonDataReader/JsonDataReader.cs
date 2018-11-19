using System.IO;
using Newtonsoft.Json;

namespace EF.Manager.Components.JsonDataReader
{
    public abstract class JsonDataReader<T>
    {
        protected T Read(string folder, string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), folder, fileName);
            var dataSet = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<T>(dataSet);
        }
    }
}