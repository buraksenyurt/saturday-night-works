using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyBookStore.Data;

namespace MyBookStore.Pages
{

    public class IndexModel
            : PageModel
    {
        private readonly StoreDataContext _context;

        public IndexModel(StoreDataContext context)
        {
            // DbContext'i içeriye aldık
            _context = context;
        }
        public IList<Book> Books { get; private set; }
        // Kitap listesini çektiğimiz asenkron metodumuz
        public async Task OnGetAsync()
        {
            Books = await _context.Books
                            .AsNoTracking()
                            .ToListAsync();
        }
        // Silme operasyonunu icra eden metodumuz
        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            // Silme operasyonu için Identity alanından önce
            // kitabı bul
            var book=await _context.Books.FindAsync(id);
            if(book!=null) //Kitabı bulduysan
            {
                _context.Books.Remove(book); 
                //Kitabı çıkart ve Context'i son haliyle kaydet
                await _context.SaveChangesAsync();
            }
            return RedirectToPage(); // Scotty bizi o anki sayfaya döndür
        }
    }
}
