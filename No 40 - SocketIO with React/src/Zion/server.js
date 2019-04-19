/*
Önce sunucu için gerekli modülleri ekleyelim.
Socket.Io kullanımı için socketIo modülü kullanılıyor.
Web server ve http özellikleri içinse epxress ve http modülleri.
*/

const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express(); // express nesnesini örnekle
const appServer = http.createServer(app); // express'i kullanan http server oluşturuluyor
const channel = socketIo(appServer); // Socket.io middleware'e ekleniyor.

// ya çevre değişkenlerinden gelen port bilgisini ya da 5555 portunu kullanıyoruz
const port = process.env.PORT || 5555;

// Yeni soketler için connection isimli bir olay dinleyici açılıyor.
// İstemci connection namespace'ini kullanarak bağlanıyor
channel.on("connection", socket => {
    console.log(`${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı`);
    // TODO: İstemci hakkında daha fazla bilgiyi nasıl alabilirim? IP adresi gibi.
    
    // gelen veriyi dinleyeceğimiz bir olay metodu olarak düşünebiliriz.
    // bir publisher sokete veri yolladığında devreye giriyor
    // İstemci, "input road" isimli namespace'den yararlanarak veri gönderebiliyor
    socket.on("input road", (data) => {

        console.log(`${Date(Date.now()).toLocaleString()}:Gelen veriler\n\tHız:${data.speed}\n\tDevir:${data.rpm}\n\tMotor sıcaklığı:${data.heat}`);
        // gelen veriyi, göndericiyi hariç tutaraktan bağlı olan ne kadar dinleyici varsa onlara yolluyoruz.
        // aslında bir broadcast yayın yapıyoruz diyebiliriz.
        // istemcilere yayın "output road" isimli namespace üzerinden yapılıyor.
        // emit metodunun ikinci parametresinde, yayıncının yolladığı verinin serileştirilerek kullanıldığını görebilirsiniz.
        socket.broadcast.emit("output road", { engineData: data });  // burası callback metodumuz olarak düşünülebilir
    });

    // istemcilerin bağlantı kesmelerini ele aldığımız olay
    // Bu kez "disconnect" isimli bir namespace söz konusu
    // disconnect, socket.io için rezerve edilmiş anahtar kelimelerden.
    socket.on("disconnect", () => {
        /* 
        Burada çeşitli temizleme operasyonları yapılabilir.
        Mesela istemcinin gitme, gelme hareketlerini takip ediyorsak,
        burada state değişikliği yapılabilir.
        */
        console.log(`${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`);
    });
});

// Sunucuyu ayağa kaldırıyor ve dinlemeye başlıyoruz
appServer.listen(port, () => {
    console.log(`${Date(Date.now()).toLocaleString()}: Sunucu ${port} nolu port üzerinden aktif konumda.`);
});




