namespace Api.Components.Factories
{
    public interface IFactory<TParam, T>
    {
        T Create(TParam param);
    }

    public interface IFactory<T>
    {
        T Create();
    }
}