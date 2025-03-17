using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models;

public class User
{
  [Key]
  public Guid Id { get; set; }
  public required string Username { get; set; }
  public required string Password { get; set; }
  public required string FirstName { get; set; }
  public required string LastName { get; set; }
}
