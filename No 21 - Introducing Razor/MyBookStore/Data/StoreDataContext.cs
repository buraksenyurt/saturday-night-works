using Microsoft.EntityFrameworkCore;

namespace MyBookStore.Data
{
    public class StoreDataContext
        : DbContext
    {
        public StoreDataContext(DbContextOptions<StoreDataContext> options)
            : base(options)
        {
            // InMemory db kullanacağımız bilgisi startup'cs deki
            // Constructor metoddan alınıp base ile DbContext sınıfına gönderilir
        }

        public DbSet<MyBookStore.Data.Book> Books { get; set; } // Kitapları tutacağımız DbSet 
    }
}