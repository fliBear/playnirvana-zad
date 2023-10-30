using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace signalrclient.Models;
public record Request
{
    [Key]
    public int Id { get; set; }
    public string? Lat { get; set; }
    public string? Lang { get; set; }
    public string? Category { get; set; }
    public string? Search { get; set; }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}