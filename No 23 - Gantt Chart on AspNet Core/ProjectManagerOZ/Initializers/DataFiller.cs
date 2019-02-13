using System;
using System.Linq;
using ProjectManagerOZ.Models;

namespace ProjectManagerOZ.Initializers
{
    /*
    Bu sınıfın amacı başlangıçta boş olan veritabanı tablolarına
    örnekte kullanabilmemiz için ilk verileri eklemek.
    Bu amaçla örnek task ve link'ler oluşturuluyor.
    Mesela Epic bir Work Item ve ona bağlı User Story'ler gibi
     */
    public static class DataFiller
    {
        public static void Prepare(ApolloDataContext context)
        {
            if (context.Tasks.Any()) //Eğer veritabanında en az bir Task varsa zaten veri içeriyor demektir. Bu durumda initalize işlemine gerek yok.
                return;
            
            var epic = new Task
            {
                Text = "JWT Implementation for Category WebAPI",
                StartDate = DateTime.Today.AddDays(-10),
                Duration = 18,
                Progress = 0.4m,
                ParentId = null,
                Type = "Epic"
            };
            context.Tasks.Add(epic);
            var story1 = new Task
            {
                Text = "I want to develop tokenizer service",
                StartDate = DateTime.Today.AddDays(-2),
                Duration = 8,
                Progress = 0.6m,
                ParentId = epic.Id,
                Type = "User Story"
            };
            context.Tasks.Add(story1);

            var story2 = new Task
            {
                Text = "I have to implement tokinizer service",
                StartDate = DateTime.Today.AddDays(-2),
                Duration = 8,
                Progress = 0.6m,
                ParentId = epic.Id,
                Type = "User Story"
            };

            context.SaveChanges();
        }
    }
}