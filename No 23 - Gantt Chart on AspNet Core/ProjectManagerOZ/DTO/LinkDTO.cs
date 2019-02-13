using System;
using System.Text.Encodings.Web;
using ProjectManagerOZ.Models;
/*
    DTO sınıfımız WebAPI tarafında, Gantt kütüphanesi ile olan haberleşmedeki mesajlaşmalarda kullanılan modeli tanımlıyor.
    Arka plandaki Link nesnemizden ziyade Gantt kütüphanesinin istediği alan adlarına sahip. Peki tabii API Controller metodlarındaki 
    Link ve LinkDTO arasındaki dönüşümleri kolayaştırmak adına bilinçli olarak operatörlerin aşırı yüklendiğini görüyoruz.
*/

namespace ProjectManagerOZ.DTO
{

    public class LinkDTO
    {
        public int id { get; set; }
        public string type { get; set; }
        public int source { get; set; }
        public int target { get; set; }

        public static explicit operator LinkDTO(Link link)
        {
            return new LinkDTO
            {
                id = link.Id,
                type = link.Type,
                source = link.SourceTaskId,
                target = link.TargetTaskId
            };
        }

        public static explicit operator Link(LinkDTO link)
        {
            return new Link
            {
                Id = link.id,
                Type = link.type,
                SourceTaskId = link.source,
                TargetTaskId = link.target
            };
        }
    }
}