namespace Fikrat.Api.Endpoints;

public static class HealthEndpoints
{
    public static void MapHealthEndpoints(this WebApplication app)
    {
        app.MapGet("/health", () => Results.Ok(new
            {
                status = "Healthy",
                timestampUtc = DateTime.UtcNow
            }))
            .WithName("GetHealth")
            .WithTags("Health");
    }
}
