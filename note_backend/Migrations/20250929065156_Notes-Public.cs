using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace note_backend.Migrations
{
    /// <inheritdoc />
    public partial class NotesPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPublic",
                table: "Notess",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPublic",
                table: "Notess");
        }
    }
}
