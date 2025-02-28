namespace MoviesAPI.DTOs.Movie;

public class MovieDTO
{
  public Guid Id { get; set; }
  public required string Title { get; set; }
  public required int ReleaseYear { get; set; }
  public required string Genre { get; set; }
  public required string Director { get; set; }
}
