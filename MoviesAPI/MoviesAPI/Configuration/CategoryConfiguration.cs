using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoviesAPI.Models;

namespace MoviesAPI.Configuration;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
  public void Configure(EntityTypeBuilder<Category> builder)
  {
    builder.HasKey(c => c.Id);

    builder.Property(c => c.Name)
        .IsRequired()
        .HasMaxLength(100);

    builder.Property(m => m.DateCreated)
    .IsRequired();

    builder.Property(m => m.LastModified)
        .IsRequired();

    builder.HasMany(m => m.Movies)
        .WithMany(m => m.Categories)
        .UsingEntity<MovieCategory>(
          j => j.HasOne(mc => mc.Movie)
                .WithMany()
                .HasForeignKey(mc => mc.MovieId),
          j => j.HasOne(mc => mc.Category)
                .WithMany()
                .HasForeignKey(mc => mc.CategoryId));
  }
}
