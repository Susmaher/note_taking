using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using note_backend.Entities;

namespace note_backend.Context
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Notes> Notess { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Notes>(entity =>
            {
                entity.Property(n => n.Content).HasColumnType("jsonb");
            });
        }
    }
}
