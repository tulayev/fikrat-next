using Fikrat.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Fikrat.Api.Endpoints;

public static class CategoryEndpoints
{
    private const string RoutePrefix = "/api/v1/categories";

    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup(RoutePrefix).WithTags("Categories");

        group.MapGet("/", (
            string? type,
            [FromQuery(Name = "seminar_limit")] int? seminarLimit,
            ICategoryService categoryService) =>
        {
            var categories = categoryService.GetAll(type, seminarLimit);
            return Results.Ok(new { data = new { categories } });
        });
    }
}
