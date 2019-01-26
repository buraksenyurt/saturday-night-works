using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagerApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ManagerApi
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // Hosted servisi bildirimimizi yapıyoruz
            // services.AddHostedService<GarbageHostService>();

            /// HostedService eklendi
            services.AddHostedService<CommonHostedService>();
            // DI ile arka plan görevlerini üstlenen servisler scope'a dahil edilip
            // CommonHostedService tipine bildiriliyor
            services.AddScoped<ITaskContractService, StatisticTaskService>();
            services.AddScoped<ITaskContractService, PrepareArtifactService>();

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
