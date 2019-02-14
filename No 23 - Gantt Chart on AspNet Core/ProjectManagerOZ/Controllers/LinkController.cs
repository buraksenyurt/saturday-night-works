using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerOZ.Models;
using ProjectManagerOZ.DTO;

namespace ProjectManagerOZ.Controllers
{
    [Produces("application/json")] // JSON formatında çıktı üreteceğimizi belirtiyoruz
    [Route("api/task")] // Gantt Chart kütüphanesinin beklediği Link API adresi
    public class LinkController
        : Controller
    {
        // Controller içerisine pek tabii ApolloDataContext'imizi geçiyoruz.
        private readonly ApolloDataContext _context;
        public LinkController(ApolloDataContext context)
        {
            _context = context;
        }
    }
}