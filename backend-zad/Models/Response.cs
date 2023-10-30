using System.ComponentModel.DataAnnotations;

namespace backend_zad.Models;
public record Response
{
    [Key]
    public int Id { get; set; }

    //String because the task does not specify in what format does the response given to the user of a hub needs to be in
    public string? ResponseBody { get; set; }
}