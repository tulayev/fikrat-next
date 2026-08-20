using Fikrat.Api.Models;

namespace Fikrat.Api.Services;

public interface ICourseService
{
    IReadOnlyList<Course> GetAll();
    Course? GetById(int id);
    Course Create(CreateCourseRequest request);
    Course? Update(int id, UpdateCourseRequest request);
    bool Delete(int id);
}
