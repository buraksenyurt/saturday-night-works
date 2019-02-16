using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InstanceAPI.Controllers
{
    [Route("api/random/[controller]")]
    [ApiController]
    public class NamesController : ControllerBase
    {
        List<string> nameList=new List<string>{
            "Senaida","Armand","Yi","Tyra","Maud",
            "Dominque","Jayme","Amira","Salome","Anisa",
            "Spencer","Angelyn","Pete","Hoa","Cherelle",
            "Lavonne","Gladys","Adrianne","Gussie","Delmar"
        };
        
        // HTTP Get talebine cevap veren metodumuz.
        // nameList koleksiyonundan rastgele bir isim döndürüyor
        [HttpGet]
        public ActionResult<string> Get()
        {
            Random randomizer=new Random();
            var number=randomizer.Next(0,21);
            return nameList[number];
        }
    }
}
