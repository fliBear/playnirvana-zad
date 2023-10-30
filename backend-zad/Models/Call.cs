using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_zad.Models;
public record Call
{
    [Key]
    public int Id { get; set; }

    public int? RequestId { get; set; }
    [ForeignKey("RequestId")]
    public virtual Request? Request { get; set; }

    public int? ResponseId { get; set; }
    [ForeignKey("ResponseId")]
    public virtual Response? Response { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.Now;
}