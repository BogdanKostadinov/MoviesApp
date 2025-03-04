namespace MoviesAPI.DTOs;

public class MovieUpdateDTO
{
  public string? Title { get; set; }
  public int? ReleaseYear { get; set; }
  public string? Director { get; set; }
  public List<Guid>? CategoryIds { get; set; }
}
