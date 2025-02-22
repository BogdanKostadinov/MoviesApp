namespace MoviesAPI.Models;

public class Movie
{
  public Guid Id { get; set; }
  public required string Title { get; set; }
  public DateTime ReleaseYear { get; set; }
  public required string Genre { get; set; }
  public required string Director { get; set; }
}
