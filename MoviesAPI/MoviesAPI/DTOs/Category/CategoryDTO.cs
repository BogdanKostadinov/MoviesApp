using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs.Categories;

public class CategoryDTO
{
  [Key]
  public Guid Id { get; set; }
  public required string Name { get; set; }
}
