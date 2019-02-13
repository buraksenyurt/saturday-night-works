using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ProjectManagerOZ.Models;

/*
    DataFillerExtension sınıfı InitializeDb isimli bir extension method içeriyor.
    Bu metodu IWebHost türevli nesne örneklerine uygulayabiliyoruz.
    Amaç çalışma zamanında host ortamı inşa edilirken Middleware katmanında araya girip
    veritabanı üzerinde Prepare operasyonunu icra ettirmek.
    Bu genişletme fonksiyonunu Program.cs içerisinde kullanmaktayız.
 */
namespace ProjectManagerOZ.Initializers
{
    public static class DataFillerExtensions
    {
        public static IWebHost InitializeDb(this IWebHost webHost)
        {
            // çalışma zamanını servislerinin üreticisini örnekle
            var serviceFactory = (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

            // Bir Scope üret
            using (var currentScope = serviceFactory.CreateScope())
            {
                // Güncel ortamdan servis sağlayıcısını çek
                var serviceProvider = currentScope.ServiceProvider;
                // Servis sağlaycısından sisteme enjekte edilmiş entity context'ini iste
                var dbContext = serviceProvider.GetRequiredService<ApolloDataContext>();
                // context'i kullanarak veritabanını dolduran fonksiyonu çağır
                DataFiller.Prepare(dbContext);
            }
            // IWebHost örneğini yeni bezenmiş haliyle geri döndür
            return webHost;
        }
    }
}