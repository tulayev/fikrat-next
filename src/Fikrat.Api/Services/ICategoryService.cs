using Fikrat.Api.Models;

namespace Fikrat.Api.Services;

public interface ICategoryService
{
    IReadOnlyList<Category> GetAll(string? type, int? seminarLimit);
}
