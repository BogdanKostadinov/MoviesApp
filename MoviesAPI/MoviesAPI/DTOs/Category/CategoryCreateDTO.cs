namespace MoviesAPI.DTOs;

public class CategoryCreateDTO
{
  public required string Name { get; set; }
  public List<Guid> MovieIds { get; set; } = new();
}
