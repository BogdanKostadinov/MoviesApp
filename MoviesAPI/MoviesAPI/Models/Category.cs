using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesAPI.Models.Category;

public class Category
{
  [Key]
  public Guid Id { get; set; }
  public required string Name { get; set; }
  [ForeignKey("MovieId")]
  public Guid MovieId { get; set; }
  public Movie.Movie? Movie { get; set; }
}
