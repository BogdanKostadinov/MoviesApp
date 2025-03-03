using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models.Movie;

public class Movie
{
  [Key]
  public Guid Id { get; set; }
  public required string Title { get; set; }
  public required int ReleaseYear { get; set; }
  public List<Category.Category> Categories { get; set; } = new();
  public required string Director { get; set; }
}
