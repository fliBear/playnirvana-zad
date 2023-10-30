using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;
using signalrclient.Models;

namespace signalrclient;
internal class SignalRClient
{
    static async Task Main(string[] args)
    {

        var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

        string ConnectionString = configuration["ConnectionString"] ?? "failure";

        var hubConnection = new HubConnectionBuilder()
            .WithUrl(ConnectionString)
            .Build();

        //Get notification that a request has been created and invoke the hub method to get the new request
        hubConnection.On<string>("RequestCreated", async (info) =>
        {
            Console.WriteLine($"Received info about a new request");
            await hubConnection.InvokeAsync("SendCall", "Please");
        });

        hubConnection.On<Request>("ReceiveRequest", (request) =>
        {
            Console.WriteLine($"Received call: {request}");
        });

        await hubConnection.StartAsync();

        Console.WriteLine("Press Enter to exit.");
        Console.ReadLine();
    }
}