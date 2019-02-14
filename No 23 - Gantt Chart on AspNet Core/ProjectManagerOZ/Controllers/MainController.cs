using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerOZ.Models;
using ProjectManagerOZ.DTO;

namespace ProjectManagerOZ.Controllers
{
    [Produces("application/json")]
    [Route("api/backlog")] // Bu adres bilgisi index.html içerisinde de geçiyor. Bulun ;)
    public class MainController : Controller
    {
        // Controller içerisine pek tabii ApolloDataContext'imizi geçiyoruz.
        private readonly ApolloDataContext _context;
        public MainController(ApolloDataContext context)
        {
            _context = context;
        }

        // HTTP Get ile verinin çekildiği metodumuz. Talebi index.html sayfasından yapıyoruz
        [HttpGet]
        public object Get()
        {
            // Task ve Link veri setlerini TaskDTO ve LinkDTO tipinden nesnelere dönüştürdüğümüz dikkatinizden kaçmamıştır.
            // Bunun sebebi Gantt'ın beklediği veri tipini sunan DTO sınıfı ile backend tarafında kullandığımız sınıfların farklı olmasıdır.

            // Dönüş olarak kullandığımız nesne data ve links isimli iki özellik tutuyor.
            // data özelliğinde Task bilgilerini
            // links özelliğinde de tasklar arasındaki bağlantı bilgilerini dönüyoruz
            // bu format özelleştirilmediği sürece Gantt Chart'ın beklediği tiptedir
            
            return new
            {
                data = _context.Tasks
                    .OrderBy(t => t.Id)
                    .ToList()
                    .Select(t => (TaskDTO)t),
                links = _context.Links
                    .ToList()
                    .Select(l => (LinkDTO)l)
            };
        }        
    }
}