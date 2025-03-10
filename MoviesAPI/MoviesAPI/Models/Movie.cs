using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models;

public class Movie : AuditableEntity
{
  [Key]
  public Guid Id { get; set; }
  public required string Title { get; set; }
  public required int ReleaseYear { get; set; }
  public required string Director { get; set; }
  public List<Category> Categories { get; } = new();
}
