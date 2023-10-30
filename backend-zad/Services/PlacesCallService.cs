using AutoMapper;
using backend_zad.Hubs;
using backend_zad.Models;
using backend_zad.Repositories;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace backend_zad.Services;
public class PlacesCallService : ICallHandlingService<PlacesDTO, PlacesApiResult>
{
    private readonly ILocationsRepository _repository;
    private readonly IMapper _mapper;

    public PlacesCallService(ILocationsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public void HandleCall(PlacesDTO clientCall, PlacesApiResult serverResponse)
    {
        Request request = _mapper.Map<Request>(clientCall);
        //Convert to string, because the task does not specify in what format does the response given to the user of a hub needs to be in
        Response response = new()
        {
            ResponseBody = JsonConvert.SerializeObject(serverResponse)
        };
        Call call = new()
        {
            Request = request,
            Response = response
        };

        _repository.SaveRequest(request);
        _repository.SaveResponse(response);
        _repository.SaveCall(call);
    }
}