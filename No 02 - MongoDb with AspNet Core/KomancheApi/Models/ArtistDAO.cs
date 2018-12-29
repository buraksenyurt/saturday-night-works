using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace KomancheApi.Models
{
    public class ArtistDAO
    {
        MongoClient client;
        IMongoDatabase db;

        public ArtistDAO()
        {
            client = new MongoClient("mongodb://localhost:27017");
            db = client.GetDatabase("MusicDB");
        }

        public IEnumerable<Artist> GetArtists()
        {
            var result = db.GetCollection<Artist>("Artists")
                .Find(FilterDefinition<Artist>.Empty)
                .ToList();
            return result;
        }


        public Artist GetArtist(ObjectId id)
        {
            return db.GetCollection<Artist>("Artists")
                .Find<Artist>(a => a.Id == id)
                .FirstOrDefault();
        }

        public Artist Create(Artist payload)
        {
            db.GetCollection<Artist>("Artists").InsertOne(payload);
            return payload;
        }

        public bool Update(ObjectId id, Artist payload)
        {
            var filter = Builders<Artist>.Filter.Eq(a => a.Id, id);
            var update = Builders<Artist>.Update
                            .Set(a => a.Title, payload.Title)
                            .Set(a => a.Tags, payload.Tags);
            var result = db
                .GetCollection<Artist>("Artists")
                .UpdateOne(filter, update);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
        public bool Remove(ObjectId id)
        {
            var result = db.GetCollection<Artist>("Artists")
                           .DeleteOne<Artist>(a => a.Id == id);
            if (result.IsAcknowledged == false)
                return false;
            else
                return true;
        }
    }
}