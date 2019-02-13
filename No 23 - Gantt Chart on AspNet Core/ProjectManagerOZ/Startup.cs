using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore; //EF Core kullanacağımız için eklendi
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjectManagerOZ.Models;

namespace ProjectManagerOZ
{
    public class Startup
    {
        /*
        Configuration özelliği ve Startup'ın overload edilmiş Constructor metodu varsayılan olarak gelmiyor.
        ApolloDbContext için gerekli connection string bilgisine ulaşacağımız Configuration nesnesine
        erişebilmek amacıyla eklendiler 
         */
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // appsettings'den SQLite için gerekli connection string bilgisini aldık
            var conStr = Configuration.GetConnectionString("ApolloDataContext");
            // ardından SQLite için gerekli DB Context'i servislere ekledik
            // Artık modellerimiz SQLite veritabanı ile çalışacak
            // Bu işlemler runtime'de gerçekleşecek
            services.AddDbContext<ApolloDataContext>(options => options.UseSqlite(conStr));
            services.AddMvc(); // Web API Controller'ının çalışabilmesi için ekledik
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // wwwroot altındaki index.html benzeri sayfaları kullanabileceğimizi belirttik
            app.UseDefaultFiles();
            // ayrıca wwwroot altındaki css, image gibi asset'lerinde kullanılacağı ifade edildi
            app.UseStaticFiles();
            app.UseMvc(); // Web API Controller'ının çalışabilmesi için ekledik
        }
    }
}
