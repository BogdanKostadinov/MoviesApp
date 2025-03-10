using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoviesAPI.Models;

namespace MoviesAPI.Configuration;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
  public void Configure(EntityTypeBuilder<Movie> builder)
  {
    builder.HasKey(m => m.Id);
    builder.Property(m => m.Title)
        .IsRequired()
        .HasMaxLength(100);

    builder.Property(m => m.ReleaseYear)
        .IsRequired();

    builder.Property(m => m.Director)
        .IsRequired();

    builder.Property(m => m.DateCreated)
        .IsRequired();

    builder.Property(m => m.LastModified)
        .IsRequired();

    builder.HasMany(m => m.Categories)
        .WithMany(m => m.Movies)
        .UsingEntity<MovieCategory>(
          j => j.HasOne(mc => mc.Category)
                .WithMany()
                .HasForeignKey(mc => mc.CategoryId),
          j => j.HasOne(mc => mc.Movie)
                .WithMany()
                .HasForeignKey(mc => mc.MovieId));
  }
}
