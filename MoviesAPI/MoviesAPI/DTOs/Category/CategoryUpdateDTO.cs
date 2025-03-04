namespace MoviesAPI.DTOs;

public class CategoryUpdateDTO
{
  public required string Name { get; set; }
  public List<Guid> MovieIds { get; set; } = new();
}
