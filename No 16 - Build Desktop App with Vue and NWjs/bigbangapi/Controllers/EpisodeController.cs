using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace bigbangapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodeController : ControllerBase
    {

        [HttpGet("{name}")]
        public ActionResult<Episode> Get(string name)
        {
            try
            {
                string db = System.IO.File.ReadAllText("db/content.json");
                JObject json = JObject.Parse(db);
                JArray episodes = (JArray)json["episodes"];
                var all = episodes
                            .Select(e => new Episode
                            {
                                Id = (int)e["id"],
                                Name = (string)e["name"],
                                Season = (int)e["season"],
                                Number = (int)e["number"],
                                Summary = (string)e["summary"],
                                ImageLink = (string)e["image"]["medium"],
                                AirDate=(string)e["airdate"]
                            });
                var result = all.Where(e => e.Name == name).FirstOrDefault();
                return new ActionResult<Episode>(result);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
