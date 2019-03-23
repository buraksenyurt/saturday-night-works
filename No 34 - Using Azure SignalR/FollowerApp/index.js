const signalR = require("@aspnet/signalr"); // signalR istemci modülünü bildirdik

/* 
    Hub bağlantı bilgisini inşa ediyoruz.
    withUrl parametresi Azure Function uygulamasının yayın yaptığı adrestir
*/
const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:4503/api')
    .build();

console.log('Bağlantı sağlanıyor...');

/*
    Bağlantıyı başlatıyoruz. Başarılı ise then metodunun içeriği,
    bir hata oluşursa da catch metodunun içeriği çalışır.
*/
connection.start()
    .then(() => console.log('Bağlantı sağlandı...'))
    .catch(console.error);

/*
    actionHappend olayını dinlemeye başladık.
    Eğer SignalR servisi üzerinden bir push mesajı söz konusu olursa
    bu olay üzerinden geçeceği için istemci tarafından yakalanıp
    doSomething metodu çağırılacaktır.
    doSomething'e gelen parametre Azure Function'daki
    PushTimelineNotification fonksiyonundan dönen mesajın Arguments içeriğini taşır.

*/
connection.on("actionHappend", doSomething);

function doSomething(action) {
    console.log(action);
}

connection.onclose(() => console.log('Bağlantı koparılıyor...'));
