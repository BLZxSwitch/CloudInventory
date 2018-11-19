namespace Api.Components.Otp
{
    public interface IProtectedDataProvider
    {
        string Protect(byte[] data);
        byte[] Unprotect(string str);
    }
}