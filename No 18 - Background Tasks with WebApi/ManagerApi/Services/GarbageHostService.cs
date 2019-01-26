using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

namespace ManagerApi.Services
{
    // IHostedService türevli sınıfımız arka planda bir takım işleri belli periyotlarda gerçekleştirecek
    public class GarbageHostService
        : IHostedService, IDisposable
    {
        private Timer _timer; // Zamanlayıcı nesnemiz
        private DateTime _time;
        private int _second; // saniye cinsinden periyodu bu değişkende tutabiliriz
        private int _cachePoint;
        IConfigurationRoot configuration;

        // İstenirse aşağıdaki gibi bir yapıcı kullanılarak servisin kullanacağı
        // dış bağımlılıkların içeriye enjekte edilmesi de sağlanabilir
        // Mesela ILogger<T> gibi

        public GarbageHostService()
        {
            // Configuration dosya içeriğini almaya çalışıyoruz
            // Daha şık bir yol bulmak lazım
            // Amaç TickTime ve CacheClearPoint değerlerini kendi eklediğimiz GarbageSettings
            // isimli Section'dan okumak ve buradaki alanlara atamak
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            configuration = builder.Build();
            _second = 5;
            Int32.TryParse(configuration.GetSection("GarbageSettings")["TickTime"].ToString(),out _second);  
            _cachePoint=30;
            Int32.TryParse(configuration.GetSection("GarbageSettings")["CacheClearPoint"].ToString(),out _cachePoint);  
        }

        // Belirli periyotlarda devreye girecek olan ve asıl görevi üstlenen metodumuz
        private void Walk(object state)
        {
            var current = DateTime.Now;
            TimeSpan lifeCycle = current - _time;
            Console.WriteLine("Geçen zaman farkı {0} saniye", lifeCycle.TotalSeconds);
            if (lifeCycle.TotalSeconds > _cachePoint)
            {
                Console.WriteLine("----> Cache'i temizleme görevini icra ediyorum ---->");
                _time = DateTime.Now; //Başlangıç noktasını güncel zamana eşitle
            }
        }

        // Web Host modeline göre geliştirme yaptığımızda sunucu başlatıldıktan sonra,
        // Generic Host modeline göre geliştirme yaptığımızda sunucu başlamadan önce
        // devreye giren ve görev başlatma ile ilgili iş kurallarını içeren metot.
        public Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("\nGörevim başlıyor. Ta ta ta taaa!!! \n");
            _timer = new Timer(Walk, null, TimeSpan.Zero, TimeSpan.FromSeconds(_second));
            Console.WriteLine("Zamanlayıcı ayarlandı\n");
            _time = DateTime.Now; // Anlık zamanı alalım. Walk içinde kontrol edeceğiz
            return Task.CompletedTask; // Task başarılı şekilde tamamlandı dönüşü

        }
        // Host düzgün bir şekilde sonlandığında devreye giren ve
        // arka plan görevinin sonlandırılmasın sırasında çalıştırılacak
        // iş kurallarını içeren metot. Çeşitli resource'ların sonlandırılması
        // gibi işlemler burada yapılabilir.
        // Her iki metod aksilikler halinde işlemlerin iptal edilebilmesi ve çevre
        // birimlerin gerekli işlemler yapması için cancellationToken parametresine
        // sahiptir(Varsayılan tahammül süresi 5 saniyedir)
        public Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("\nGörevim sonlanıyor");
            _timer?.Change(Timeout.Infinite, 0); // Zamanlayıcıyı durdur
            Console.WriteLine("\nZamanlayıcı durduruldu!");
            return Task.CompletedTask;
        }

        // servis ömrünü tamamlarken devreye girecek metod
        public void Dispose() => _timer?.Dispose(); // zamanlayıcı nesnemiz etkinse onu sonlandırıyoruz.
    }

}