using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerOZ.Models;
using ProjectManagerOZ.DTO;
using Microsoft.EntityFrameworkCore;

/*
    Link nesneleri ile ilgili CRUD operasyonlarını üstlenen Web API Controller sınıfımız
 */
namespace ProjectManagerOZ.Controllers
{
    [Produces("application/json")] // JSON formatında çıktı üreteceğimizi belirtiyoruz
    [Route("api/link")] // Gantt Chart kütüphanesinin beklediği Link API adresi
    public class LinkController
        : Controller
    {
        // Controller içerisine pek tabii ApolloDataContext'imizi geçiyoruz.
        private readonly ApolloDataContext _context;
        public LinkController(ApolloDataContext context)
        {
            _context = context;
        }

        // Yeni bir Link eklerken devreye giren HTTP Post metodumuz
        [HttpPost]
        public IActionResult Create(LinkDTO payload)
        {
            var l = (Link)payload;

            _context.Links.Add(l);
            _context.SaveChanges();

            /*
                Task örneğinde olduğu gibi istemci tarafına oluşturulan Link
                örneğine ait Id değerini göndermemiz lazım ki, takip eden Link bağlama,
                güncelleme veya silme gibi işlemler çalışabilsin.
                tid, istemci tarafının beklediği değişken adıdır.
             */
            return Ok(new
            {
                tid = l.Id,
                action = "inserted"
            });
        }


        /*
        Bir Link'i güncellemek istediğimizde devreye giren metodumuz
         */
        [HttpPut("{id}")]
        public IActionResult Update(int id, LinkDTO payload)
        {
            // Gelen payload içeriğini backend tarafındaki model sınıfına dönüştür
            var l = (Link)payload;
            // id eşlemesi yap
            l.Id = id;
            // durumu güncellendiye çek
            _context.Entry(l).State = EntityState.Modified;
            // ve değişiklikleri kaydedip
            _context.SaveChanges();
            // HTTP 200 döndür
            return Ok();
        }

        /*
        HTTP Delete operasyonuna karşılık gelen ve
        parametre olarak gelen id değerine göre silme işlemini icra eden metodumuz
         */
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Link örneğini bul
            var l = _context.Links.Find(id);
            if (l != null)
            {
                // Entity Context'inden ve
                _context.Links.Remove(l);
                // Kalıcı olarak veritabanından sil
                _context.SaveChanges();
            }

            return Ok();
        }

        // Tüm Link örneklerini döndüren HTTP Get metodumuz
        [HttpGet]
        public IEnumerable<LinkDTO> Get()
        {
            return _context.Links
                .ToList()
                .Select(t => (LinkDTO)t);
        }

        // Belli bir Id değerine göre ilgili Link nesnesinin DTO karşılığını döndüren HTTP Get metodumuz
        [HttpGet("{id}")]
        public LinkDTO GetById(int id)
        {
            return (LinkDTO)_context
                .Links
                .Find(id);
        }
    }
}