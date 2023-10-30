namespace backend_zad.Services;
public interface ILocationsService<T>
{
    public Task<T> GetLocationData(string lat, string lang, string? searchKeyword, string? category);
}