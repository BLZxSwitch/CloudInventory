namespace Api.Components.EmailSender
{
    public interface IEmailConfiguration
    {
        string ApiKey { get; set; }
        string SenderEmail { get; set; }
        string SenderName { get; set; }
    }
}
