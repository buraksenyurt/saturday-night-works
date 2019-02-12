using Microsoft.EntityFrameworkCore;

namespace ProjectManagerOZ.Models
{
    // Entity Framework DB Context sınıfımız
    public class ApolloDataContext
        : DbContext
    {
        public ApolloDataContext(DbContextOptions<ApolloDataContext> options)
            : base(options)
        {
        }

        // Proje görevleri ile bunlar arasındaki olası ilişkileri temsil eden özelliklere sahip
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Link> Links { get; set; }
    }
}