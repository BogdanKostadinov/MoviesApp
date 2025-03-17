namespace MoviesAPI.DTOs;

public class UserDTO
{
  public Guid Id { get; set; }
  public required string Username { get; set; }
  public required string FirstName { get; set; }
  public required string LastName { get; set; }
}
