using System;

namespace ManagerApi.Services
{
    public class PrepareArtifactService
        : ITaskContractService
    {
        public string Description => "Ben dağıtım için gerekli paketleri çıkan servisim";

        public void DoYourJob()
        {
            Console.WriteLine("----> Deployment artifact'leri üretiliyor ---->");
        }
    }
}