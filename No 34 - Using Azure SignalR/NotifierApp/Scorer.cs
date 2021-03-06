using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Basketcini.Function
{
    public static class Scorer
    {
        /*
        Scorer fonskiyonu HTTP Post tipinden tetiklemeleri karşılar.
        Oluşan aksiyonları saklamak için Table Storage kullanılır. Actions isimli tablo Table niteliği ile bildirilmiştir.
        Ayrıca gerçekleşen olaylar bir kuyruğa atılır(Queue niteliğinin olduğu kısım)
        Console'a log yazdırmak için ILogger türevli log değişkeni kullanılır.
        */
        [FunctionName("Scorer")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] Timeline timelineEvent,
            [Table("Actions")]IAsyncCollector<Action> actions,
            [Queue("new-action-notification")]IAsyncCollector<Timeline> actionNotifications,
            ILogger log)
        {
            log.LogInformation("HTTP tetikleme gerçekleşti");
            log.LogInformation($"{timelineEvent.Who} için {timelineEvent.WhatHappend} olayı");

            /* HTTP Post metodu ile gelen timeline bilgilerini de kullanarak bir Action nesnesi 
            oluşturuyor ve bunu Table Storage'e atıyoruz.
            Amaç, meydana gelen olaylarla ilgili gelen bilgileri bir tabloda kalıcı olarak saklamak.
            Pek tabii bunun yerine farklı repository'ler de tercih edilebilir. Cosmos Db gibi örneğin.
            */
            await actions.AddAsync(new Action
            {
                PartitionKey = "US",
                RowKey = Guid.NewGuid().ToString(),
                Player = timelineEvent.Who,
                Summary = timelineEvent.WhatHappend
            });

            /* 
                new-action-notification ile ilintili olan kuyruğa gerçekleşen olay bilgilerini atıyoruz.
                İstemci tarafını bu kuyruk içeriği ile besleyebiliriz.
            */
            await actionNotifications.AddAsync(timelineEvent);

            return new OkResult();
        }

        /*
        Azure SignalR servisine bağlanmak için kullanılan metodumuz. 
        HTTP Post ile tetiklenir.
        Fonksiyon bir SignalRConnectionInfo nesnesini döndürür.
        Bu nesne Azure SignalR'a bağlanırken gerekli benzersiz id ve access token bilgisini içerir.
        SignalR Hub-Name olarak notifications ismi kullanılır.
         */
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo GetNotificationSignal(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")]HttpRequest request,
            [SignalRConnectionInfo(HubName = "notifications")]SignalRConnectionInfo connection,
            ILogger log
        )
        {
            log.LogInformation("Negotiating...");
            return connection;
        }

        /*
        Abone olan tarafa veri göndermek (push) için kullanılan fonksiyondur.
        QueueTrigger niteliğindeki isimlendirme ve tipin Scorer fonksiyonundaki ile aynı olduğuna dikkat edelim.
        İstemciye mesaj taşıyan nesne bir SignalRMessage örneğidir. 
        Bu nesnenin Arguments özelliğinde timeline içeriği (yani gerçekleşen maç olayları) taşınır.
        Peki aboneler buradaki olayları nasıl dinleyecek dersiniz? Bunun içinde Target özelliğine atanan içerik önem kazanır. 
        Örneğimizide aboneler 'actionHappend' isimli olayı dinleyerek mesajları yakalayacaktır.
         */
        [FunctionName("PushTimelineNotification")]
        public static async Task PushNofitication(
            [QueueTrigger("new-action-notification")]Timeline timeline,
            [SignalR(HubName = "notifications")]IAsyncCollector<SignalRMessage> message,
            ILogger log
        )
        {
            log.LogInformation($"{timeline.Who} için gerçekleşen olay bildirimi");

            await message.AddAsync(
                new SignalRMessage
                {
                    Target = "actionHappend",
                    Arguments = new[] { timeline }
                }
            );
        }
    }
}
