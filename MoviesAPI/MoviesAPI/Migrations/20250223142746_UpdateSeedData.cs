using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MoviesAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    { new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e"), "Christopher Nolan", "Science Fiction", new DateTime(2010, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Inception" },
                    { new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e"), "Lana Wachowski, Lilly Wachowski", "Action", new DateTime(1999, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "The Matrix" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d3e39d5e-3e4b-6d8a-9d3e-3e4b6d8a9d3e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e4f49d5e-4f4b-7e8a-9e4e-4f4b7e8a9e4e"));

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e"));

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e"));
        }
    }
}
