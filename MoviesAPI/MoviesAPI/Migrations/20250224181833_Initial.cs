using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MoviesAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Director = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("d3e39d5e-3e4b-6d8a-9d3e-3e4b6d8a9d3e"), "Action" },
                    { new Guid("e4f49d5e-4f4b-7e8a-9e4e-4f4b7e8a9e4e"), "Science Fiction" }
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "Id", "Director", "Genre", "ReleaseYear", "Title" },
                values: new object[,]
                {
                    { new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e"), "Christopher Nolan", "Science Fiction", 2010, "Inception" },
                    { new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e"), "Lana Wachowski, Lilly Wachowski", "Action", 1999, "The Matrix" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
