using System;
using Microsoft.AspNetCore.SignalR.Client;
using signalrclient.Models;

namespace signalrclient;
internal class SignalRClient
{
    static async Task Main(string[] args)
    {
        var hubConnection = new HubConnectionBuilder()
            .WithUrl("http://localhost:5188/Places")
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