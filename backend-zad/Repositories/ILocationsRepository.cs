using backend_zad.Models;

namespace backend_zad.Repositories;
public interface ILocationsRepository
{
    public List<Response> GetResponses();
    public List<Request> GetRequests();
    public List<Call> GetCalls();
    public void SaveCall(Call call);
    public void SaveResponse(Response response);
    public void SaveRequest(Request request);
    public Request GetLatestRequest();
}