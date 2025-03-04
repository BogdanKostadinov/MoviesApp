namespace MoviesAPI.DTOs;

public class CategoryDTO
{
  public Guid Id { get; set; }
  public required string Name { get; set; }
  public List<Guid> MovieIds { get; set; } = new();

}
