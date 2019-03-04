/*
    sunucu özelliklerini kolayca kazandırmak için express modülünü kullanıyoruz.
    WebSocket kullanımı içinse socket.io paketi dahil ediliyor
*/
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const articles = {}; // Üzerinde çalışılacak yazıların tutulacağı repo. Canlı ortamlar için fiziki alan ele alınmalı.

/* 
on metodları birer event listener'dır. İlk parametre olayın adı,
ikinci parametrede olay tetiklendiğinde çalışacak callback fonksiyonudur.

connection Socket.IO için tahsis edilmiş bir olaydır. 
Burada soket haberleşmesi tesis edilir ve bağlı olan
istemciler için broadcasting başlatılır.
*/

io.on("connection", socket => {

    /*
    updateRoom metodu bağlı olan tüm istemcilerin aynı doküman üzerinde çalışmasını garanti etmek içindir.
    İstemci bağlantı gerçekleştirip dokümanla çalışmak üzere bir odaya bağlanır(room).
    Bağlı olan istemci bu odadayken başka bir dokümanla çalışmasına izin verilmez.
    N sayıda istemci aynı odadayken aynı doküman üzerinde güncelleme yapabilir.
    İstemci bir başka dokümanla çalışmak isterse bulunduğu odadan ayrılır ve yeni bir tanesine katılır.
    Tabii Socket.IO ile n sayıda oda(room) ile çalışmak mümkündür. Ancak bu senaryoda istenmemektedir.
    */
    let preId;
    const updateRoom = currentId => {
        socket.leave(preId);
        socket.join(currentId);
        preId = currentId;
    };

    /*
    istemci get isimli bir olay yayınladığında çalışır.
    istemci bir odaya gelen id ile dahil edilir.
    sonrasında sunucu dokümanı istemciye yollar. 
    Bunun için ready isimli bir olay yayınlar ki istemci de bu olayı dinlemektedir.
    */
    socket.on("get", id => {
        updateRoom(id);
        socket.emit("ready", articles[id]);
    });

    /*
    add yeni bir dokümanın eklenmesi için kullanılır.
    istemci tarafından yayınlanan olayda payload olarak
    dokümanın kendisi gelir. 

    io üzerinden yayınlanan warnEveryone isimli olay
    istemcilerin tümünü yeni bir dokümanın eklendiği bilgisini vermek üzere tasarlanmıştır.

    socket üzerinden yapılan olay bildirimi payload dokümanı ile birlikte sadece bağlı
    olan istemci için geçerlidir. 

    socket ile io nesnelerinin emit kullanımları arasındaki farka dikkat edelim.
    io.emit bağlı olan tüm istmecileri ilgilendirirken, socket.emit o anki olayın
    sahibi bağlı olan istemciyi ilgilendirir.
    */
    socket.on("add", payload => {
        articles[payload.id] = payload;
        updateRoom(payload.id);
        io.emit("warnEveryone", Object.keys(articles));
        socket.emit("ready", payload);
    });


    /*
    İstemcilerin üzerinde çalıştıkları dokümanda yaptıkları herhangibir tuş darbesi
    bu olayın tetiklenmesi ile ilgilidir.
    Payload içeriğine göre odadaki doküman güncellenir ve
    sadece bu doküman üzerinde çalışanların bilgilendirimesi sağlanır.
    */
    socket.on("update",payload => {
        articles[payload.id] = payload;
        socket.to(payload.id).emit("ready", payload);
    });

    // Tüm bağlı istemcileri template dizisindeki key değerleri için bilgilendir
    io.emit("warnEveryone", Object.keys(articles));
});

http.listen(5004);
console.log("Ortak makale yazma platformu :P 5004 nolu porttan dinlemede...");