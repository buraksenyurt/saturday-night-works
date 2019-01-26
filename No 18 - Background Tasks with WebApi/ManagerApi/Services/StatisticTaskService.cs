using System;

namespace ManagerApi.Services
{
    public class StatisticTaskService
        : ITaskContractService
    {
        public string Description => "Ben ortam ölçümlerini gönderen servisim";

        //TODO: Loglama mekanizmasını ILogger yardımıyla buraya enjekte edin
        public void DoYourJob()
        {
            Console.WriteLine("---->Uygulamaya ait istatistik bilgileri gönderiliyor---->");
        }
    }
}