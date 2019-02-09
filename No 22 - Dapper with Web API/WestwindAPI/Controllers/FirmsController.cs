using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WestwindAPI.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SQLite;

namespace WestwindAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirmsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string conStr;

        // appsettings içerisindeki ConnectionStrings bilgisine ihtiyacımız olacak
        // Bu nedenle .net core'un built-in configuration yöneticisini içeri alıyoruz.
        public FirmsController(IConfiguration configuration)
        {
            _configuration = configuration;
            conStr = _configuration.GetConnectionString("WestwindConStr");
        }

        [HttpGet]
        public ActionResult<IEnumerable<Firm>> Get()
        {
            // Standart get talebi sonrası Firm listesini döndürüyoruz
            IEnumerable<Firm> firms = new List<Firm>();
            // SQLite connection nesnesini oluştur
            using (var conn = new SQLiteConnection(conStr))
            {
                conn.Open(); // bağlantıyı aç
                // standart bir SQL sorgusu çalıştırıyoruz
                // isme göre sıralayarak firma bilgilerini alıyoruz
                firms = conn.Query<Firm>("SELECT * FROM FIRM ORDER BY NAME");

            }
            return new ActionResult<IEnumerable<Firm>>(firms);
        }

        // Belli bir şehirdeki firmaların bilgilerini döndüren metodumuz
        [HttpGet("{city}")]
        public ActionResult<IEnumerable<Firm>> GetByCity(string city)
        {
            IEnumerable<Firm> firms = new List<Firm>();
            // SQLite connection nesnesini oluştur
            using (var conn = new SQLiteConnection(conStr))
            {
                conn.Open(); // bağlantıyı aç
                // Bu kez işin içerisinde bir where koşulu var
                firms = conn.Query<Firm>("SELECT * FROM FIRM WHERE CITY = @FirmCity ORDER BY NAME", new { FirmCity = city });

            }
            return new ActionResult<IEnumerable<Firm>>(firms);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Firm payload)
        {
            try
            {
                using (var conn = new SQLiteConnection(conStr))
                {
                    conn.Open(); // bağlantıyı aç
                    // INSERT cümleciğini çalıştır
                    // ikinci parametreye dikkat. Burada API'ye talebin body'si ile gelen JSON içeriğini kullanıyoruz.
                    conn.Execute(@"INSERT INTO FIRM (ID,NAME,CITY,SALARY) VALUES (@ID,@NAME,@CITY,@SALARY)", payload);
                    return Ok(payload);
                }
            }
            catch (SQLiteException excp) // Olası bir SQLite exception durumunda HTTP 400 Bad Request hatası verip içerisine exception mesajını gömüyoruz
            {
                return BadRequest(excp.Message); //Bunu production ortamlarında yapmayın. Loglama yapın başka bir mesaj verin. Exception içerisinde koda ve sorguya dair ipuçları olabilir.
            }
        }

        // Güncelleme işlemleri için kullanacağımız metot
        [HttpPut()]
        public IActionResult Put([FromBody] Firm payload)
        {
            try
            {
                using (var conn = new SQLiteConnection(conStr))
                {
                    conn.Open(); // bağlantıyı aç
                    // UPDATE cümleciğini çalıştır
                    // Parametreler diğer metodlarda olduğu gibi @ sembolü ile başlayan kelimelerden oluşuyor
                    // Bu parametrelere değer atarken anonymous type de kullanabiliyoruz.

                    //TODO Aslında gelen JSON içeriğinde hangi alanlar varsa sadece onları güncellemeye çalışalım
                    var result = conn.Execute(@"UPDATE FIRM SET NAME=@firmName,CITY=@firmCity,SALARY=@firmSalary WHERE ID=@firmId",
                        new
                        {
                            firmName = payload.Name,
                            firmCity = payload.City,
                            firmSalary = payload.Salary,
                            firmId = payload.ID
                        });
                    if (result == 1)
                        return Ok(payload); // Eğer güncelleme sonucu 1 ise (ki ID bazlı güncelleme olduğundan 1 dönmesini bekliyoruz) HTTP 200
                    else
                        return NotFound(); // ID değerinde bir firma yoksa HTTP 404
                }
            }
            catch (SQLiteException excp) // Olası bir SQLite exception durumunda HTTP 400 Bad Request hatası verip içerisine exception mesajını gömüyoruz
            {
                return BadRequest(); // HTTP 400 
            }
        }

        // Silme operasyonları için çalışan metot
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var conn = new SQLiteConnection(conStr))
            {
                conn.Open(); // bağlantıyı aç
                var result = conn.Execute(@"DELETE FROM FIRM WHERE ID=@firmId",new { firmId = id });
                if (result == 1)
                    return Ok(); // Eğer silme operasyonu başarılı ise etkilenen kayıt sayısı (ki bu senaryoda 1 bekliyoruz) 1 döner HTTP 200
                else
                    return NotFound(); // Aksi durumda bu ID de bir kayıt yoktur diyebiliriz. HTTP 404
            }
        }
    }
}