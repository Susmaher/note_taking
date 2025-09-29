namespace note_backend.Models
{
    public class NoteCreateAndSaveDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public Boolean IsPublic { get; set; }
    }
}
