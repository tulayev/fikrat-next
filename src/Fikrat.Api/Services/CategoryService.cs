using Fikrat.Api.Models;

namespace Fikrat.Api.Services;

// Transaction Script: each public method is a self-contained procedure for one use case.
// In-memory placeholder store only — no database yet.
public class CategoryService : ICategoryService
{
    private readonly ILogger<CategoryService> _logger;
    private readonly List<Category> _categories;
    private readonly Lock _lock = new();

    public CategoryService(ILogger<CategoryService> logger)
    {
        _logger = logger;
        _categories = new List<Category>
        {
            new()
            {
                Id = 1, Name = "Marketing", Slug = "marketing", Type = "live",
                Seminars = new List<Seminar>
                {
                    new() { Id = 1, Slug = "digital-marketing-asoslari", Title = "Digital marketing asoslari",
                            ShortDescription = "Raqamli marketingga kirish.", Caption = "/images/seminars/1.jpg",
                            Duration = "2 kun", Price = 250000m, StartedAt = new DateTime(2026, 9, 1) },
                    new() { Id = 2, Slug = "smm-strategiyasi", Title = "SMM strategiyasi",
                            ShortDescription = "Ijtimoiy tarmoqlarda targeting.", Caption = "/images/seminars/2.jpg",
                            Duration = "1 kun", Price = 180000m, StartedAt = new DateTime(2026, 9, 10) },
                    new() { Id = 3, Slug = "seo-optimallashtirish", Title = "SEO optimallashtirish",
                            ShortDescription = "Qidiruv tizimlari uchun optimallashtirish.", Caption = "/images/seminars/3.jpg",
                            Duration = "3 kun", Price = 300000m, StartedAt = new DateTime(2026, 9, 20) },
                }
            },
            new()
            {
                Id = 2, Name = "Dasturlash", Slug = "dasturlash", Type = "live",
                Seminars = new List<Seminar>
                {
                    new() { Id = 4, Slug = "c-sharp-intensiv", Title = "C# intensiv kurs",
                            ShortDescription = ".NET asosida backend dasturlash.", Caption = "/images/seminars/4.jpg",
                            Duration = "5 kun", Price = 500000m, StartedAt = new DateTime(2026, 10, 1) },
                    new() { Id = 5, Slug = "react-workshop", Title = "React workshop",
                            ShortDescription = "Interaktiv UI qurish.", Caption = "/images/seminars/5.jpg",
                            Duration = "2 kun", Price = 280000m, StartedAt = new DateTime(2026, 10, 8) },
                }
            },
            new()
            {
                Id = 3, Name = "Onlayn kurslar", Slug = "onlayn-kurslar", Type = "lifeless",
                Seminars = new List<Seminar>
                {
                    new() { Id = 6, Slug = "video-montaj-asoslari", Title = "Video montaj asoslari",
                            ShortDescription = "Premiere Pro bilan tanishuv.", Caption = "/images/seminars/6.jpg",
                            Duration = "10 soat", Price = 150000m, StartedAt = new DateTime(2026, 8, 25) },
                    new() { Id = 7, Slug = "grafik-dizayn", Title = "Grafik dizayn",
                            ShortDescription = "Figma va Photoshop asoslari.", Caption = "/images/seminars/7.jpg",
                            Duration = "8 soat", Price = 140000m, StartedAt = new DateTime(2026, 9, 5) },
                }
            },
            new()
            {
                Id = 4, Name = "Til kurslari", Slug = "til-kurslari", Type = "lifeless",
                Seminars = new List<Seminar>
                {
                    new() { Id = 8, Slug = "ingliz-tili-a1", Title = "Ingliz tili A1",
                            ShortDescription = "Boshlang'ich daraja.", Caption = "/images/seminars/8.jpg",
                            Duration = "20 soat", Price = 200000m, StartedAt = new DateTime(2026, 9, 15) },
                    new() { Id = 9, Slug = "ingliz-tili-b1", Title = "Ingliz tili B1",
                            ShortDescription = "O'rta daraja.", Caption = "/images/seminars/9.jpg",
                            Duration = "20 soat", Price = 220000m, StartedAt = new DateTime(2026, 9, 22) },
                    new() { Id = 10, Slug = "rus-tili-boshlang-ich", Title = "Rus tili boshlang'ich",
                            ShortDescription = "Nol darajadan boshlash.", Caption = "/images/seminars/10.jpg",
                            Duration = "15 soat", Price = 190000m, StartedAt = new DateTime(2026, 10, 2) },
                }
            },
        };
    }

    public IReadOnlyList<Category> GetAll(string? type, int? seminarLimit)
    {
        lock (_lock)
        {
            var query = _categories.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(type))
            {
                query = query.Where(c => string.Equals(c.Type, type, StringComparison.OrdinalIgnoreCase));
            }

            return query.Select(c => Project(c, seminarLimit)).ToList();
        }
    }

    // Returns a shallow copy with a possibly-truncated Seminars list so the
    // seed data held in _categories is never mutated by a caller's limit.
    private static Category Project(Category source, int? seminarLimit)
    {
        var seminars = seminarLimit is int limit && limit >= 0
            ? source.Seminars.Take(limit).ToList()
            : source.Seminars.ToList();

        return new Category
        {
            Id = source.Id,
            Name = source.Name,
            Slug = source.Slug,
            Type = source.Type,
            Seminars = seminars
        };
    }
}
