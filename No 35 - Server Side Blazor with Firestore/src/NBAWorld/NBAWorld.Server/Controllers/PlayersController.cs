using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NBAWorld.Server.Data;
using NBAWorld.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace NBAWorld.Server.Controllers
{
    /*
        İstemci tarafına CRUD operasyon desteği sunacak olan API servisimiz.
     */
    [Route("api/[controller]")]
    public class PlayersController
        : Controller
    {
        PlayerDAL playerDAL = new PlayerDAL();

        // Tüm oyuncu listesini döndüren HTTP Get metodumuz
        [HttpGet]
        public Task<List<Player>> Get()
        {
            return playerDAL.GetPlayers();
        }

        /*
        HTTP Post çağrısı ile yeni bir oyuncuyu Firestore'a eklemek için kullandığımız servis metodu.
        Mesaj gövdesinden JSON formatında gelen oyuncu içeriğini kullanır.
        DAL'daki ilgili metodu çağırır. Firestore'a asıl ekleme işini PlayerDAL içindeki metod gerçekleştirir.
         */
        [HttpPost]
        public void Post([FromBody]Player player)
        {
            playerDAL.NewPlayer(player);
        }

        /*
        Silme işlemini üstlenen metodumuz.
        Querystring ile gelen id değerini kullanır.
        Data Access Layer nesnesindeki DeletePlayer metodunu çağırır.
         */
        [HttpDelete("{documentId}")]
        public void Delete(string documentId)
        {
            playerDAL.DeletePlayer(documentId);
        }
    }
}