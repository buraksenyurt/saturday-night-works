using System;
/* 
proje görevlerinin verisinin tutulduğu Entity sınıfımız
Tipik olarak görevle ilgili bilgiler yer alır. 
Açıklaması, süresi, hangi durumda olduğu, bağlı olduğu başka bir task varsa O, başlangıç tarihi, tipi vs
*/
 
namespace ProjectManagerOZ.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
        public int? ParentId { get; set; }
        public string Type { get; set; }
    }
}