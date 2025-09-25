namespace note_backend.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }

        public string? Role { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefresTokenExpiryTime { get; set; }
    }
}
