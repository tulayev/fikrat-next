using Fikrat.Api.Endpoints;
using Fikrat.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "FrontendCorsPolicy";

builder.Services.AddOpenApi();
builder.Services.AddSingleton<ICourseService, CourseService>();
builder.Services.AddSingleton<ICategoryService, CategoryService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:3001")
            .AllowAnyHeader()
            .AllowAnyMethod();
        // No AllowCredentials(): the frontend sends a bearer token via the
        // Authorization header (see src/Fikrat.Client/src/utils/api.js), not cookies.
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(FrontendCorsPolicy);

app.MapHealthEndpoints();
app.MapCourseEndpoints();
app.MapCategoryEndpoints();

app.Run();
