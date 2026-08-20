namespace Fikrat.Api.Models;

public record CreateCourseRequest(string Title, string Description, string Category, int DurationHours);

public record UpdateCourseRequest(string Title, string Description, string Category, int DurationHours);
