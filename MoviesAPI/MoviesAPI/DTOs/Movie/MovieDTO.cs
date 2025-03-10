using MoviesAPI.Models;

namespace MoviesAPI.DTOs;

public class MovieDTO : AuditableEntity
{
  public Guid Id { get; set; }
  public required string Title { get; set; }
  public required int ReleaseYear { get; set; }
  public required string Director { get; set; }
  public List<CategoryDTO> Categories { get; set; } = new();
}
