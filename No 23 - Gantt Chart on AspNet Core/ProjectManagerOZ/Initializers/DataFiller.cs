using System;
using System.Collections.Generic;
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

            // Parent task'ı oluşturuyoruz (ParentId=null)
            var epic = new Task
            {
                Text = "JWT Implementation for Category WebAPI",
                StartDate = DateTime.Today.AddDays(1),
                Duration = 5,
                Progress = 0.4m,
                ParentId = null,
                Type = "Epic"
            };
            context.Tasks.Add(epic); //Task örneğini context'e ekleyip
            context.SaveChanges(); //tabloyada yazıyoruz
            var story1 = new Task
            {
                Text = "I want to develop tokenizer service",
                StartDate = DateTime.Today.AddDays(1),
                Duration = 4,
                Progress = 0.5m,
                ParentId = epic.Id, //story'yi epic senaryoya ParentId üzerinden bağlıyoruz. Aynı bağlantı Story2 içinde gerçekleştiriliyor
                Type = "User Story"
            };
            context.Tasks.Add(story1);
            context.SaveChanges();

            var story2 = new Task
            {
                Text = "I have to implement tokinizer service",
                StartDate = DateTime.Today.AddDays(3),
                Duration = 5,
                Progress = 0.8m,
                ParentId = epic.Id,
                Type = "User Story"
            };
            context.Tasks.Add(story2);
            context.SaveChanges();

            var epic2 = new Task
            {
                Text = "Create ELK stack",
                StartDate = DateTime.Today.AddDays(3),
                Duration = 3,
                Progress = 0.2m,
                ParentId = null,
                Type = "Epic"
            };
            context.Tasks.Add(epic2);
            context.SaveChanges();

            var story3 = new Task
            {
                Text = "We have to setup Elasticsearch",
                StartDate = DateTime.Today.AddDays(6),
                Duration = 6,
                Progress = 0.0m,
                ParentId = epic2.Id,
                Type = "User Story"
            };
            context.Tasks.Add(story3);
            context.SaveChanges();

            var story4 = new Task
            {
                Text = "We have to implement Logstash to Microservices",
                StartDate = DateTime.Today.AddDays(6),
                Duration = 2,
                Progress = 0.3m,
                ParentId = epic2.Id,
                Type = "User Story"
            };
            context.Tasks.Add(story4);
            context.SaveChanges();

            var story5 = new Task
            {
                Text = "We have to setup Kibana for Elasticsearch",
                StartDate = DateTime.Today.AddDays(6),
                Duration = 2,
                Progress = 0.0m,
                ParentId = epic2.Id,
                Type = "User Story"
            };
            context.Tasks.Add(story5);
            context.SaveChanges();

            // Oluşturduğumuz proje görevleri arasındaki ilişkileri oluşturuyoruz
            List<Link> taskLinks = new List<Link>{
                new Link{SourceTaskId=epic.Id,TargetTaskId=story1.Id,Type="1"},
                new Link{SourceTaskId=epic.Id,TargetTaskId=story2.Id,Type="1"},
                new Link{SourceTaskId=epic2.Id,TargetTaskId=story3.Id,Type="1"},
                new Link{SourceTaskId=story3.Id,TargetTaskId=story4.Id,Type="1"},
                new Link{SourceTaskId=story4.Id,TargetTaskId=story5.Id,Type="1"},
                new Link{SourceTaskId=epic.Id,TargetTaskId=epic2.Id,Type="2"}
            };
            taskLinks.ForEach(l => context.Links.Add(l));
            context.SaveChanges();
        }
    }
}