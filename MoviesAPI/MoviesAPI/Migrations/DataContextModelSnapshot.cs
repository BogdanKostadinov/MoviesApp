﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MoviesAPI.Data;

#nullable disable

namespace MoviesAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MoviesAPI.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = new Guid("d3e39d5e-3e4b-6d8a-9d3e-3e4b6d8a9d3e"),
                            Name = "Action"
                        },
                        new
                        {
                            Id = new Guid("e4f49d5e-4f4b-7e8a-9e4e-4f4b7e8a9e4e"),
                            Name = "Science Fiction"
                        });
                });

            modelBuilder.Entity("MoviesAPI.Models.Movie", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Director")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ReleaseYear")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Movies");

                    b.HasData(
                        new
                        {
                            Id = new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e"),
                            Director = "Christopher Nolan",
                            ReleaseYear = 2010,
                            Title = "Inception"
                        },
                        new
                        {
                            Id = new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e"),
                            Director = "Lana Wachowski, Lilly Wachowski",
                            ReleaseYear = 1999,
                            Title = "The Matrix"
                        });
                });

            modelBuilder.Entity("MoviesAPI.Models.MovieCategory", b =>
                {
                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MovieId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("CategoryId", "MovieId");

                    b.HasIndex("MovieId");

                    b.ToTable("MovieCategory");
                });

            modelBuilder.Entity("MoviesAPI.Models.MovieCategory", b =>
                {
                    b.HasOne("MoviesAPI.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoviesAPI.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Movie");
                });
#pragma warning restore 612, 618
        }
    }
}
