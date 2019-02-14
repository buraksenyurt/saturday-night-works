using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerOZ.Models;
using ProjectManagerOZ.DTO;

namespace ProjectManagerOZ.Controllers
{
    [Produces("application/json")]
    [Route("api/task")] // Gantt Chart kütüphanesinin beklediği Task API adresi
    public class TaskController
        : Controller
    {
        // Controller içerisine pek tabii ApolloDataContext'imizi geçiyoruz.
        private readonly ApolloDataContext _context;
        public TaskController(ApolloDataContext context)
        {
            _context = context;
        }

        // HTTP Post metodumuz
        // Yeni bir Task eklemek için kullanılıyor
        [HttpPost]
        public IActionResult Create(TaskDTO task)
        {
            // Mesaj parametresi olarak gelen TaskDTO içeriğini Task tipine dönüştürdük
            var payload = (Task)task;
            // Task'ı Context'e ekle
            _context.Tasks.Add(payload);
            // Kalıcı olarak kaydet
            _context.SaveChanges();

            /*HTTP 200 Ok dönüyoruz
             Dönerken de oluşan Task Id değerini de yolluyoruz
             Bu Child task'ları bağlarken veya bir Task'ı silerken
             gerekli olan bir bilgi nitekim. Aksi halde istemci
             tarafındaki Gantt kütüphanesi kiminle işlem yapması gerektiğini bilemiyor.
             İnanmıyorsanız sadece HTTP 200 döndürüp durumu inceleyin :)
             */
            return Ok(new
            {
                tid = payload.Id,
                action = "inserted"
            });
        }

        // HTTP Put ile çalıştırılan güncelleme metodumuz
        // Parametrede Task'ın id bilgisi gelecektir
        [HttpPut("{id}")]
        public IActionResult Update(int id, TaskDTO task)
        {
            // Mesaj ile gelen TaskDTO örneğini dönüştürüp id değerini verdik
            var payload = (Task)task;
            payload.Id = id;

            // id'den ilgili Task örneğini bulduk
            var t = _context.Tasks.Find(id);

            // alan güncellemelerini yaptık
            t.Text = payload.Text;
            t.StartDate = payload.StartDate;
            t.Duration = payload.Duration;
            t.ParentId = payload.ParentId;
            t.Progress = payload.Progress;
            t.Type = payload.Type;

            // değişiklikleri veritabanına kaydettik
            _context.SaveChanges();

            // HTTP 200 Ok dönüyoruz
            return Ok();
        }

        // HTTP Delete yani silme işlemi için çalışacak metodumuz
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Task'ı bulalım ve eğer varsa
            var task = _context.Tasks.Find(id);
            if (task != null)
            {
                // önce Context'ten 
                _context.Tasks.Remove(task);
                // sonra veritabanından silelim
                _context.SaveChanges();
            }

            // HTTP 200 Ok dönüyoruz
            return Ok();
        }

        // HTTP Get karşılığı çalışan metodumuz
        // Tüm Task'ları geri döndürür
        [HttpGet]
        public IEnumerable<TaskDTO> Get()
        {
            return _context.Tasks
                .ToList()
                .Select(t => (TaskDTO)t);
        }

        // HTTP Get ile ID bazlı çalışan metodumuz
        // Belli bir ID'ye ait Task bilgisini verir
        [HttpGet("{id}")]
        public TaskDTO GetById(int id)
        {
            return (TaskDTO)_context
                .Tasks
                .Find(id);
        }
    }
}