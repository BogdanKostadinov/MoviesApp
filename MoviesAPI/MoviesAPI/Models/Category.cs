using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models;

public class Category : AuditableEntity
{
  [Key]
  public Guid Id { get; set; }
  public required string Name { get; set; }
  public List<Movie> Movies { get; } = new();
}
