using Microsoft.AspNetCore.Mvc;

namespace MoviesAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
  // GET: api/<ValuesController>
  [HttpGet]
  public IEnumerable<string> GetCategories()
  {
    return new string[] { "value1", "value2" };
  }

  [HttpGet("{id}")]
  public string GetCategory(string id)
  {
    return "value";
  }

  [HttpPost]
  public void Post([FromBody] string value)
  {
  }

  [HttpPut("{id}")]
  public void Put(int id, [FromBody] string value)
  {
  }

  [HttpDelete("{id}")]
  public void Delete(int id)
  {
  }
}
