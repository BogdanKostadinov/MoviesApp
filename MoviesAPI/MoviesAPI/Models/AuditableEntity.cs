namespace MoviesAPI.Models;

public class AuditableEntity
{
  public DateTime DateCreated { get; set; }
  public DateTime LastModified { get; set; }
}
