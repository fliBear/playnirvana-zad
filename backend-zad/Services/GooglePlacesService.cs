

using backend_zad.Models;
using Newtonsoft.Json;

namespace backend_zad.Services;
public class GooglePlacesService : ILocationsService<PlacesApiResult>
{
    private readonly IConfiguration _configuration;

    public GooglePlacesService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    //Google Places API offers searching with link parameter: keyword and filtering by category using the parameter: type
    public async Task<PlacesApiResult> GetLocationData(string lat, string lang, string? searchKeyword, string? category)
    {
        string apiKey = _configuration["ApiKey"] ?? "";
        using var client = new HttpClient();
        var response = JsonConvert.DeserializeObject<PlacesApiResult>(await client.GetStringAsync(
            String.Format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={0},{1}&radius=1500&keyword={2}&type={3}&key={4}",
            lat, lang, searchKeyword, category, apiKey)));
        return response;
    }
}