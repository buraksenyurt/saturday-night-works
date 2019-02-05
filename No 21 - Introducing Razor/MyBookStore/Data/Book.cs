using System;
using System.ComponentModel.DataAnnotations;

namespace MyBookStore.Data
{
    /*
    Book entity sınıfının özelliklerini DataAnnotations'dan gelen çeşitli
    attribute'lar ile kontrol altına alıyoruz.
    Zorunlu alan olma hali, sayısallar ve string'ler için aralık kontrolü yapmaktayız.
    Buradaki ErrorMessage değerleri, Razor Page tarafında Validation işlemi sırasında 
    değer kazanır ve gerektiğinde uyarı olarak sayfada gösterilirler.
     */
    public class Book
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Kitabın adını yazar mısın lütfen")] 
        [StringLength(60, MinimumLength = 2, ErrorMessage = "En az 2 en fazla 60 karakter")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Kaç sayfalık bir kitap bu")]
        [Range(100, 1500, ErrorMessage = "En az 100 en çok 1500 sayfalık bir kitap olmalı")]
        public int PageCount { get; set; }
        [Required(ErrorMessage = "Liste fiyatı girilmeli")]
        [Range(1, 100, ErrorMessage = "En az 1 en çok 100 liralık kitap olmalı")]
        public double ListPrice { get; set; }
        [Required(ErrorMessage = "Kısa da olsa özet gerekli")]
        [StringLength(250, MinimumLength = 50, ErrorMessage = "Özet en az 50 en fazla 250 karakter olmalı")]
        public string Summary { get; set; }
        [Required(ErrorMessage = "Yazar veya yazarlar olmalı")]
        [StringLength(60, MinimumLength = 3, ErrorMessage = "Yazarlar için en az 3 en fazla 60 karakter")]
        public string Authors { get; set; } //TODO Author isimli bir Entity modeli kullanalım
    }
}