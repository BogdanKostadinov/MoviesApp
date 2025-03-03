using MoviesAPI.Models.Category;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs.Movie;

public class MovieDTO
{
    [Key]
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required int ReleaseYear { get; set; }
    public required List<Category> Categories { get; set; }
    public required string Director { get; set; }
}
