using System.Text.Json.Serialization;

namespace Fikrat.Api.Models;

public class Seminar
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("short_description")]
    public string ShortDescription { get; set; } = string.Empty;

    public string Caption { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public decimal Price { get; set; }

    [JsonPropertyName("started_at")]
    public DateTime StartedAt { get; set; }
}
