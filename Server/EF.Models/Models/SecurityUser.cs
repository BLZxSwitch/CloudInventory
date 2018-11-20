using System;
using System.Reflection.Metadata;

namespace EF.Models.Models
{
    public class SecurityUser
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TenantId { get; set; }

        public bool IsActive { get; set; } = true;
        public string CultureName { get; set; }
        public bool IsInvited { get; set; }
        public bool IsInvitationAccepted { get; set; }
        public string TwoFactorAuthenticationSecretKey { get; set; }
        public DateTime? ToSAcceptedDate { get; set; }
        //public Blob UserPicture { get; set; }

        public virtual User User { get; set; }
        public virtual Tenant Tenant { get; set; }
        public virtual Employee Employee { get; set; }

        public bool IsTwoFactorAuthenticationEnabled => !string.IsNullOrEmpty(TwoFactorAuthenticationSecretKey);
    }
}