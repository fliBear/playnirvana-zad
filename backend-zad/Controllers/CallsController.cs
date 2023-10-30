using backend_zad.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend_zad.Controllers;

[ApiController]
[Route("[controller]")]
public class CallsController : ControllerBase
{
    private readonly ILocationsRepository _locationsRepository;

    public CallsController(ILocationsRepository locationsRepository)
    {
        _locationsRepository = locationsRepository;
    }

    [HttpGet]
    public IActionResult GetCalls()
    {
        var calls = _locationsRepository.GetCalls();

        return Ok(calls);
    }

    [HttpGet("requests")]
    public IActionResult GetRequests()
    {
        var requests = _locationsRepository.GetRequests();

        return Ok(requests);
    }

    [HttpGet("responses")]
    public IActionResult GetResponses()
    {
        var responses = _locationsRepository.GetResponses();

        return Ok(responses);
    }

}
