using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyBookStore.Data;

namespace MyBookStore.Pages
{
    public class EditBookModel
        : PageModel
    {
        // EditBook.cshtml sayfasına BookData özelliğini bağlamak için bu nitelik ile işaretledik
        [BindProperty]
        public Book BookData { get; set; }
        private StoreDataContext _context;
        public EditBookModel(StoreDataContext context)
        {
            _context = context;
        }

        // Güncelleme sayfasına id bilgisi parametre olarak gelecektir
        // Bunu kullanarak ilgili kitabı bulmaya ve bulursak BindProperty özelliği taşıyan
        // BookData isimli özelliğe bağlıyoruz.
        public async Task<IActionResult> OnGetAsync(int id)
        {
            BookData = await _context.Books.FindAsync(id);
            if (BookData == null) // Eğer bulunamassa ana sayfaya geri dön
            {
                return RedirectToPage("/index");
            }
            return Page(); //Bulunduysa sayfada kal
        }

        public async Task<IActionResult> OnPostAsync()
        {
            // Eksik veya hatalı bilgiler nedeniyle Model örneği doğrulanamadıysa
            // sayfada kalalım
            if (!ModelState.IsValid)
            {
                return Page();
            }
            // Güncellenen kitap bilgilerini Context'e ilave edip durumunu Modified'e çektik
            _context.Attach(BookData).State = EntityState.Modified;

            try
            {
                // Değişiklikleri kaydetmeyi deniyoruz
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception($"{BookData.Id} numaralı kitabı bulamadık!");
            }

            // İşlemler başarılı ise tekrardan index'e(Anasayfa oluyor tabii) dönüyoruz
            return RedirectToPage("/index");
        }
    }
}