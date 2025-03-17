using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoviesAPI.Models;

namespace MoviesAPI.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder.HasKey(c => c.Id);

    builder.Property(c => c.Username)
        .IsRequired()
        .HasMaxLength(100);

    builder.Property(c => c.Password)
        .IsRequired()
        .HasMaxLength(100);

    builder.Property(c => c.FirstName)
        .IsRequired()
        .HasMaxLength(100);

    builder.Property(c => c.LastName)
        .IsRequired()
        .HasMaxLength(100);
  }
}
