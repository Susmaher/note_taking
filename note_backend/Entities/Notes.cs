using System.ComponentModel.DataAnnotations.Schema;

namespace note_backend.Entities
{
    public class Notes
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public Boolean isPublic { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
