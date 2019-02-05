using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MyBookStore.Data;

namespace MyBookStore.Pages
{
    // İsimlendirme standardı gereği Razor sayfa modelleri 'Model' kelimesi ile biter
    public class AddBookModel : PageModel // PageModel türetmesi ile bir model olduğunu belirttik
    {
        private readonly StoreDataContext _context;
        //BindProperty özelliği ile Book tipinden olan BookData özelliğini Razor sayfasına bağlamış olduk.
        [BindProperty]
        public Book BookData { get; set; }

        public AddBookModel(StoreDataContext context)
        {
            _context = context; // Db Context'i kullanabilmek için içeriye aldık
        }

        // Asenkron olarak çalışabilen ve sayfadaki Submit işlemi sonrası tetiklenen Post metodumuz
        // Tipik olarak Razor sayfasındaki model verisini alıp DbSet'e ekliyor ve kayıt ediyoruz.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Books.Add(BookData);
            await _context.SaveChangesAsync();
            return RedirectToPage("/Index");
        }
    }
}