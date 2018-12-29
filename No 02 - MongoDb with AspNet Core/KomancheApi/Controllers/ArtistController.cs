using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KomancheApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace ArtistMongo.Controllers
{
    [Produces("application/json")]
    [Route("api/Artists")]
    public class ArtistsController
    : Controller
    {
        ArtistDAO daoArtist;

        public ArtistsController()
        {
            daoArtist = new ArtistDAO();
        }

        [HttpGet]
        public IEnumerable<Artist> Get()
        {
            return daoArtist.GetArtists();
        }

        [HttpGet("{id:length(24)}")]
        public IActionResult Get(string id)
        {
            var artist = daoArtist.GetArtist(new ObjectId(id));
            if (artist == null)
            {
                return NotFound();
            }
            return new ObjectResult(artist);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Artist payload)
        {
            daoArtist.Create(payload);
            return new OkObjectResult(payload);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id, [FromBody]Artist payload)
        {
            var recId = new ObjectId(id);
            var result = daoArtist.Update(recId, payload);
            if (result)
                return new OkResult();
            else
                return NotFound();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var artist = daoArtist.GetArtist(new ObjectId(id));
            if (artist == null)
            {
                return NotFound();
            }

            daoArtist.Remove(artist.Id);
            return new OkResult();
        }
    }
}