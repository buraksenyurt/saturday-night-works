using System;

/*
Task'lar arasındaki ilişkinin tutulduğu Entity sınıfımız
Eğer iki Task birbiri ile bağlıysa bu sınıfa ait nesne örnekleri üzerinden ilişkilendirebiliriz.
*/
namespace ProjectManagerOZ.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int SourceTaskId { get; set; }
        public int TargetTaskId { get; set; }
    }
}