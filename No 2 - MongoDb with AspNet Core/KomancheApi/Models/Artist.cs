using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KomancheApi.Models
{
    public class Artist
    {
        public ObjectId Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }
        [BsonElement("Tags")]
        public string Tags { get; set; }
    }
}
