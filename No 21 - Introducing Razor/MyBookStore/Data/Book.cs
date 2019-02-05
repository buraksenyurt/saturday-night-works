using System.ComponentModel.DataAnnotations;

namespace MyBookStore.Data
{
    public class Book
    {
        public int Id { get; set; }
        [Required, StringLength(60)] // Gerekli bir alan ve en fazla 60 karakter olabilir
        public string Title { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public double ListPrice { get; set; }
        [Required, StringLength(250)]
        public string Summary { get; set; }
        [Required]
        public string Authors { get; set; } //TODO Author isimli bir Entity modeli kullanalım
    }
}