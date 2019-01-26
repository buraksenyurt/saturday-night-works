using System;
using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ManagerApi.Services
{
    public class CommonHostedService
        : IHostedService
    {
        IServiceProvider ServiceProvider { get; }
        // Kritik nokta burası
        // IServiceProvider üzerinde enjekte edilen servislerimize ulaşacağız
        public CommonHostedService(IServiceProvider provider)
        {
            ServiceProvider = provider;
        }

        public void StartTask()
        {
            // Güncel scope yakalanıyor
            using (var currentScope = ServiceProvider.CreateScope())
            {
                // scope'a atılan ITaskContractService türevli ne kadar service var yakalanıyor
                // Bunlar Startup.cs içinde AddScoped metodu ile aktarmıştık
                var services = currentScope.ServiceProvider.GetServices<ITaskContractService>();
                foreach (var service in services)
                {
                    // O anki servisin açıklaması yazdırılıyor
                    Console.WriteLine("SEN NE YAPIYORSUN?\n{0}", service.Description);
                    // DoYourJob fonksiyonu gerçek servis örneği için çalıştırılıyor
                    // Runtime'da hangi servis örneğine denk geldiysek onun DoYourJob metodu çalışacak (Polymorphsym'i hatırlayalım)
                    service.DoYourJob();
                }
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("\nGörevlerimi aldım ve başlatıyorum\n");
            StartTask();
            return Task.CompletedTask;
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("\nGörev sonlandırılıyor\n");
            return Task.CompletedTask;
        }
    }
}