namespace MoviesAPI.Models;

public class MovieCategory
{
  public Guid MovieId { get; set; }
  public Movie Movie { get; set; }

  public Guid CategoryId { get; set; }
  public Category Category { get; set; }
}
