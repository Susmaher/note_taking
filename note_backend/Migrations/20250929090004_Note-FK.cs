using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace note_backend.Migrations
{
    /// <inheritdoc />
    public partial class NoteFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Notess",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Notess_UserId",
                table: "Notess",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notess_Users_UserId",
                table: "Notess",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notess_Users_UserId",
                table: "Notess");

            migrationBuilder.DropIndex(
                name: "IX_Notess_UserId",
                table: "Notess");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notess");
        }
    }
}
