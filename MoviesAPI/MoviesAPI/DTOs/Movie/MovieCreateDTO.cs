using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs.Movie;

public class MovieCreateDTO
{
  [Required]
  [StringLength(100, MinimumLength = 1)]
  public required string Title { get; set; }

  [Required]
  public required string Genre { get; set; }

  [Required]
  [StringLength(100, MinimumLength = 1)]
  public required string Director { get; set; }

  [Required]
  public required int ReleaseYear { get; set; }
}
