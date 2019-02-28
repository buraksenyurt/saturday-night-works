const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();

const app = express();
app.use(cors()); //CORS özelliğini express nesnesi içine enjekte ettik

// HTTP Get çağrısı gelmesi halinde çalışacak metodumuz
app.get("/", (req, res) => {

    return admin.database().ref('/somedata').on("value", snapshot => {
        // HTTP 200 Ok cevabı ile birlikte somedata içeriğini döndürüyoruz
        return res.status(200).send(snapshot.val());
    }, err => {
        // Bir hata varsa HTTP Internal Server Error mesajı ile birlikte içeriğini döndürüyoruz
        return res.status(500).send('There is something go wrong ' + err);
    });
});

// HTTP Post çağrısını veritabanına veri eklemek için kullanacağız
app.post("/", (req, res) => {
    const payload = req.body; // gelen içeriği bir alalım
    // push metodu ile veriyi yazıyoruz.
    // işlem başarılı olursa then bloğu devreye girecektir
    // bir hata oluşması halinde catch bloğu çalışır
    return admin.database().ref('/somedata').push(payload)
        .then(() => {
            // HTTP 200 Ok - yani işlem başarılı oldu diyoruz
            return res.status(200).send('Eklendi');
        }).catch(err => {
            // İşlem başarısız oldu
            // HTTP 500 Internal server error ile hata mesajını yollayabiliriz
            return res.status(500).send('There is something go wrong ' + err);
        });
});

// Servisten dışarıya açtığımız fonksiyonlar
// somedata fonksiyonumuz için app isimli express nesnemiz ve doğal olarak Get, Post metodları ele alınacak
exports.somedata = functions.https.onRequest(app);

// Servis hayatta mı metodumuz :P
// Ping'e Pong dönüyorsa yaşıyordur deriz en kısa yoldan.
exports.ping = functions.https.onRequest((request, response) => {
    response.send("Pong!");
});
