using backend_zad.Models;
using backend_zad.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace backend_zad.Hubs;
public class PlacesHub : Hub
{
    public async Task SendCall(string message, ILocationsRepository locationsRepository)
    {
        Request response = locationsRepository.GetLatestRequest();
        await Clients.All.SendAsync("ReceiveRequest", response);
    }
}