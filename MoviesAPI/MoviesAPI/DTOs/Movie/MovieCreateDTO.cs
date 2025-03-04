namespace MoviesAPI.DTOs;

public class MovieCreateDTO
{
  public required string Title { get; set; }
  public required string Director { get; set; }
  public required int ReleaseYear { get; set; }
  public List<Guid> CategoryIds { get; set; } = new();
}
