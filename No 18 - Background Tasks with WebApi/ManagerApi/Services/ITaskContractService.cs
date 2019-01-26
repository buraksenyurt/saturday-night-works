namespace ManagerApi.Services
{
    // Asıl görevleri icra eden sınıflarımı bu arayüzden türeyecekler ve
    // mecburi olarak Walker metodunu uygulayacaklar
    public interface ITaskContractService
    {
        string Description { get; }
        void DoYourJob();
    }
}