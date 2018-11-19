namespace EF.Manager.Components.JsonDataReader
{
    public interface ITestJsonDataReader<out T>
    {
        T Read(string fileName);
    }
}