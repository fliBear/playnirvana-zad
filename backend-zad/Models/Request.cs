using System.ComponentModel.DataAnnotations;

namespace backend_zad.Models;
public record Request
{
    [Key]
    public int Id { get; set; }
    public string? Lat { get; set; }
    public string? Lang { get; set; }
    public string? Category { get; set; }
    public string? Search { get; set; }
}