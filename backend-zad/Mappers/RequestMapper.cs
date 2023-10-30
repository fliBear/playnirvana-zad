using AutoMapper;
using backend_zad.Models;

namespace backend_zad.Mappers;

public class RequestMapper : Profile
{
    public RequestMapper()
    {
        CreateMap<PlacesDTO, Request>()
        .ForMember(dest => dest.Search, opt => opt.MapFrom(src => src.Search))
        .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
        .ForMember(dest => dest.Lat, opt => opt.MapFrom(src => src.Lat))
        .ForMember(dest => dest.Lang, opt => opt.MapFrom(src => src.Lang));
    }
}