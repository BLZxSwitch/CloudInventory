namespace EF.Manager.Components.JsonDataReader
{
    public interface IProductionJsonDataReader<out T>
    {
        T Read(string fileName);
    }
}