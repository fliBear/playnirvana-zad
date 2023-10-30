using backend_zad.Hubs;
using backend_zad.Models;
using backend_zad.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace backend_zad.Controllers;

[ApiController]
[Route("[controller]")]
public class PlacesController : ControllerBase
{
    private readonly ILocationsService<PlacesApiResult> _locationsService;
    private readonly ICallHandlingService<PlacesDTO, PlacesApiResult> _callHandlingService;
    private readonly IHubContext<PlacesHub> _hubContext;

    public PlacesController(ILocationsService<PlacesApiResult> locationsService,
        ICallHandlingService<PlacesDTO, PlacesApiResult> callHandlingService,
        IHubContext<PlacesHub> hubContext)
    {
        _locationsService = locationsService;
        _callHandlingService = callHandlingService;
        _hubContext = hubContext;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PlacesDTO placesDTO)
    {
        //Get data from server
        var placesData = await _locationsService.GetLocationData(placesDTO.Lat, placesDTO.Lang, placesDTO.Search, placesDTO.Category);
        //Perform work based on data received
        _callHandlingService.HandleCall(placesDTO, placesData);
        //Notify hub subscribers
        await _hubContext.Clients.All.SendAsync("RequestCreated", "Request");
        //Return result
        return Content(JsonConvert.SerializeObject(placesData), "application/json");
    }
}
