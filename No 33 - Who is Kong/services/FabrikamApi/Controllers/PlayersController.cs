using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FabrikamApi.Models;

namespace FabrikamApi.Controllers
{
    /*
    PlayersController isimli Controller sınıfı Player türünden bir listeyle çalışıyor.
    Konumuz KONG'u tanımak olduğu için çok detalı bir servis değil.
    Temel Get, Post, Put ve Delete operasyonlarını içermekte.
    Listeyi static bir değişkende tutuyoruz. Dolayısıyla servis sonlandırıldığında bilgiler uçacaktır.
    Ancak isterseniz kalıcı bir repository ekleyebilirsiniz.
     */
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private static List<Player> playerList = new List<Player>{
            new Player{Id=1000,Nickname="Hatuta Matata",Level=100}
        };
        [HttpGet]
        public ActionResult<IEnumerable<Player>> Get()
        {
            return playerList;
        }

        [HttpGet("{id}")]
        public ActionResult<Player> Get(int id)
        {
            var p = playerList.Where(item => item.Id == id).FirstOrDefault();
            if (p != null)
            {
                return p;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public void Post([FromBody] Player player)
        {
            playerList.Add(player);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Player player)
        {
            var p = playerList.Where(item => item.Id == id).FirstOrDefault();
            if (p != null)
            {
                p.Nickname = player.Nickname;
                p.Level = player.Level;
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var p = playerList.Where(item => item.Id == id).FirstOrDefault();
            if (p != null)
            {
                playerList.Remove(p);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
