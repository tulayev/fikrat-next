using Fikrat.Api.Models;

namespace Fikrat.Api.Services;

// Transaction Script: each public method is a self-contained procedure for one use case.
// In-memory placeholder store only — no database yet.
public class CourseService : ICourseService
{
    private readonly ILogger<CourseService> _logger;
    private readonly List<Course> _courses;
    private readonly Lock _lock = new();
    private int _nextId;

    public CourseService(ILogger<CourseService> logger)
    {
        _logger = logger;
        _courses = new List<Course>
        {
            new() { Id = 1, Title = "Introduction to C#", Description = "Learn the fundamentals of C# and .NET.", Category = "Programming", DurationHours = 10 },
            new() { Id = 2, Title = "React Fundamentals", Description = "Build interactive UIs with React.", Category = "Web Development", DurationHours = 8 },
            new() { Id = 3, Title = "Data Structures & Algorithms", Description = "Core CS concepts for interviews.", Category = "Computer Science", DurationHours = 20 },
        };
        _nextId = _courses.Count + 1;
    }

    public IReadOnlyList<Course> GetAll()
    {
        lock (_lock)
        {
            return _courses.ToList();
        }
    }

    public Course? GetById(int id)
    {
        lock (_lock)
        {
            return _courses.FirstOrDefault(c => c.Id == id);
        }
    }

    public Course Create(CreateCourseRequest request)
    {
        lock (_lock)
        {
            var course = new Course
            {
                Id = _nextId++,
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                DurationHours = request.DurationHours
            };
            _courses.Add(course);
            _logger.LogInformation("Created course {CourseId}", course.Id);
            return course;
        }
    }

    public Course? Update(int id, UpdateCourseRequest request)
    {
        lock (_lock)
        {
            var course = _courses.FirstOrDefault(c => c.Id == id);
            if (course is null)
            {
                return null;
            }

            course.Title = request.Title;
            course.Description = request.Description;
            course.Category = request.Category;
            course.DurationHours = request.DurationHours;
            return course;
        }
    }

    public bool Delete(int id)
    {
        lock (_lock)
        {
            var course = _courses.FirstOrDefault(c => c.Id == id);
            if (course is null)
            {
                return false;
            }

            _courses.Remove(course);
            return true;
        }
    }
}
