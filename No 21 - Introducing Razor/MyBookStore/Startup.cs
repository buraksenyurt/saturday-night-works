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
using MyBookStore.Data;

namespace MyBookStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            // // InMemory veritabanı kullanacağımız DbContext'imizi DI ile ekledik
            // services.AddDbContext<StoreDataContext>(options=>options.UseInMemoryDatabase("StoreLook"));

            // appsettings'den SQLite için gerekli connection string bilgisini aldık
            var conStr=Configuration.GetConnectionString("StoreDataContext");
            // ardından SQLite için gerekli DB Context'i servislere ekledik
            // Artık modellerimiz SQLite veritabanı ile çalışacak
            services.AddDbContext<StoreDataContext>(options=>options.UseSqlite(conStr));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc();
        }
    }
}
