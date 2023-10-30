using System.ComponentModel.DataAnnotations;

namespace backend_zad.Models;

public class PlacesDTO
{
    [Required]
    public string Lat { get; set; } = string.Empty;
    [Required]
    public string Lang { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string? Search { get; set; }

}