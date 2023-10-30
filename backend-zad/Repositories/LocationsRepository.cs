using backend_zad.Database;
using backend_zad.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_zad.Repositories;
public class LocationsRepository : ILocationsRepository
{
    protected readonly ApplicationContext _context;
    public LocationsRepository(ApplicationContext context)
    {
        _context = context;
    }

    public List<Call> GetCalls()
    {
        return _context.Calls.
        Include(call => call.Response).
        Include(call => call.Request).
        ToList();
    }

    public List<Request> GetRequests()
    {
        return _context.Requests.ToList();
    }

    public List<Response> GetResponses()
    {
        return _context.Responses.ToList();
    }

    public void SaveCall(Call call)
    {
        _context.Calls.Add(call);
        _context.SaveChanges();
    }

    public void SaveRequest(Request request)
    {
        _context.Requests.Add(request);
        _context.SaveChanges();
    }

    public void SaveResponse(Response response)
    {
        _context.Responses.Add(response);
        _context.SaveChanges();
    }

    public Request GetLatestRequest()
    {
        return _context.Requests.OrderByDescending(r => r.Id).First();
    }
}