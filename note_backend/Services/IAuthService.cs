using note_backend.Entities;
using note_backend.Models;

namespace note_backend.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);
        Task<TokenResponseDto?> LoginAsync(UserDto request);
        Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);

        Task<Notes?> NotesAsync(NoteDto request);
        Task<List<Notes>> GetNotesAsync();
    }
}
