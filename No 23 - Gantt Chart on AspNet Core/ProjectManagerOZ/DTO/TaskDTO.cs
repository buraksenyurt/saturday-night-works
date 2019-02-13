using System;
using System.Text.Encodings.Web;
using ProjectManagerOZ.Models;
/*
    DTO sınıfımız WebAPI tarafında, Gantt kütüphanesi ile olan haberleşmedeki mesajlaşmalarda kullanılan modeli tanımlıyor.
    Arka plandaki Task nesnemizden ziyade Gantt kütüphanesinin istediği alan adlarına sahip. Sözgelimi Task tipinde StartDate varken
    burada start_date kullanılmakta.

    Peki tabii API Controller metodlarındaki Task ve TaskDTO arasındaki dönüşümleri kolayaştırmak adına bilinçli olarak operatörlerin
    aşırı yüklendiğini görüyoruz.
*/

namespace ProjectManagerOZ.DTO
{
    public class TaskDTO
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public int duration { get; set; }
        public decimal progress { get; set; }
        public int? parent { get; set; }
        public string type { get; set; }
        public string target { get; set; }
        public bool open
        {
            get { return true; }
            set { }
        }

        public static explicit operator TaskDTO(Task task)
        {
            return new TaskDTO
            {
                id = task.Id,
                text = HtmlEncoder.Default.Encode(task.Text),
                start_date = task.StartDate.ToString("yyyy-MM-dd HH:mm"),
                duration = task.Duration,
                parent = task.ParentId,
                type = task.Type,
                progress = task.Progress
            };
        }

        public static explicit operator Task(TaskDTO task)
        {

            return new Task
            {
                Id = task.id,
                Text = task.text,
                StartDate = DateTime.Parse(task.start_date, System.Globalization.CultureInfo.InvariantCulture),
                Duration = task.duration,
                ParentId = task.parent,
                Type = task.type,
                Progress = task.progress
            };
        }
    }
}