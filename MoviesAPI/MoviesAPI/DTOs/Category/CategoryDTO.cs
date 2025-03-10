using MoviesAPI.Models;

namespace MoviesAPI.DTOs;

public class CategoryDTO : AuditableEntity
{
  public Guid Id { get; set; }
  public required string Name { get; set; }
}
