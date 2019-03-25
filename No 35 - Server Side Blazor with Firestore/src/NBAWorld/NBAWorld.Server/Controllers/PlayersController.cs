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
    }
}