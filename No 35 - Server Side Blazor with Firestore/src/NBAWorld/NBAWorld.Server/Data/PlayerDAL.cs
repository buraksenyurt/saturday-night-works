using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NBAWorld.Shared.Models;
using Google.Cloud.Firestore;
using Newtonsoft.Json;

namespace NBAWorld.Server.Data
{
    /*
    Google Cloud Firestore ile iletişimde kullanılan
    Data Access Layer sınıfı.
     */
    public class PlayerDAL
    {
        string projecId = "enbiey-94b53"; // Firebase proje id
        FirestoreDb db;

        /*
            Firestore veri tabanı nesnesini, proje id ve credential 
            bilgileri ile üretmek için sınıfın yapıcı metodu oldukça
            uygun bir yer.
         */
        public PlayerDAL()
        {
            // Client iletişimi için gerekli Credential bilgisini taşıyan dosya. Firebase'den indirmiştik hatırlayın.
            // Siz tabii dosyayı hangi adrese koyduysanız orayı ele almalısınız
            string credentialFile = "/home/burakselyum/enbiey.json";
            // Environment parametrelerine GOOGLE_APPLICATION_CREDENTIALS bilgisini ekliyoruz
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialFile);
            // FirebaseDb nesnesini projeId ile oluşturuyoruz
            db = FirestoreDb.Create(projecId);
        }

        /*
        Oyuncu listesini getirecek olan metot
         */
        public async Task<List<Player>> GetPlayers()
        {
            // Koleksiyon için sorguyu hazırlıyoruz
            Query selectAll = db.Collection("players");
            // Snapshot nedir?
            QuerySnapshot selectAllSnapshot = await selectAll.GetSnapshotAsync();
            var players = new List<Player>();

            // Tüm dokümanları dolaşıyoruz
            foreach (var doc in selectAllSnapshot.Documents)
            {
                // Eğer doküman varsa
                if (doc.Exists)
                {
                    // koleksiyondaki dokümanı bir dictionary'ye al
                    Dictionary<string, object> playerDoc = doc.ToDictionary();
                    // json formatında serialize et
                    string json = JsonConvert.SerializeObject(playerDoc);
                    // gelen JSON içeriğini player örneğine çevir
                    Player player = JsonConvert.DeserializeObject<Player>(json);
                    player.DocumentId = doc.Id; //Delete ve Update işlemlerinde Firestore tarafındaki Document ID değerine ihtiyacımız olacak
                    // List koleksiyonuna ekle
                    players.Add(player);
                }
            }

            // Listeyi döndür
            return players;
        }

        /*
        Firestore'a doküman olarak yeni bir oyuncu ekleyen fonksiyonumuz
         */
        public async void NewPlayer(Player player)
        {
            // players koleksiyonuna ait referansı al
            CollectionReference collRef = db.Collection("players");
            // awaitable AddAsync metodu ile ekle
            await collRef.AddAsync(player);
        }

        /*
        Firestore'dan doküman silme işlemini üstlenen metodumuz
         */
        public async void DeletePlayer(string documentId)
        {
            // documentId bilgisini kullanarak players koleksiyonda ilgili dokümanı bul
            DocumentReference document = db.Collection("players").Document(documentId);
            // bulunan dokümanı sil
            if (document != null)
            {
                await document.DeleteAsync();
            }
        }

        /*
        Firestore'dan bir dokümanı güncellemek için kullanılan metodumuz
         */
        public async void UpdatePlayer(Player player)
        {
            // Önce parametre olarak gelen oyuncunun referansını bulmaya çalış
            DocumentReference document = db.Collection("players").Document(player.DocumentId);
            if (document != null) //eğer bulduysan
            {
                // Overwite seçeneği ile üstüne yaz
                await document.SetAsync(player, SetOptions.Overwrite);
            }
        }

        /*
        Tek bir oyuncu bilgisini dokümand ıd değerine göre çeken fonksiyonumuz
         */
        public async Task<Player> GetPlayerById(string documentId)
        {
            // Doküman referansını bulup
            DocumentReference document = db.Collection("players").Document(documentId);
            // bir görüntüsünü çekiyoruz
            DocumentSnapshot snapshot = await document.GetSnapshotAsync();
            Player player = new Player();

            if (snapshot.Exists) // Eğer snapshot içeriği mevcutsa
            {
                player.DocumentId = snapshot.Id;
                // oyuncu bilgilerini dokümandan GetValue ile alıyoruz
                player.Fullname=snapshot.GetValue<string>("Fullname");
                player.Position=snapshot.GetValue<string>("Position");
                player.SomeInfo=snapshot.GetValue<string>("SomeInfo");
                player.Length=snapshot.GetValue<string>("Length");
            }

            return player;
        }
    }
}