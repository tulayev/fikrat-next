using Fikrat.Api.Models;
using Fikrat.Api.Services;

namespace Fikrat.Api.Endpoints;

public static class CourseEndpoints
{
    private const string RoutePrefix = "/api/v1/courses";

    public static void MapCourseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup(RoutePrefix).WithTags("Courses");

        group.MapGet("/", (ICourseService courseService) =>
            Results.Ok(courseService.GetAll()));

        group.MapGet("/{id:int}", (int id, ICourseService courseService) =>
            courseService.GetById(id) is { } course
                ? Results.Ok(course)
                : Results.NotFound());

        group.MapPost("/", (CreateCourseRequest request, ICourseService courseService) =>
        {
            var created = courseService.Create(request);
            return Results.Created($"{RoutePrefix}/{created.Id}", created);
        });

        group.MapPut("/{id:int}", (int id, UpdateCourseRequest request, ICourseService courseService) =>
            courseService.Update(id, request) is { } updated
                ? Results.Ok(updated)
                : Results.NotFound());

        group.MapDelete("/{id:int}", (int id, ICourseService courseService) =>
            courseService.Delete(id)
                ? Results.NoContent()
                : Results.NotFound());
    }
}
