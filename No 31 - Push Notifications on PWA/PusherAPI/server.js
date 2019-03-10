var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FCM = require('fcm-node');
var morgan = require('morgan');
app.use(morgan('combined'));

// Firebase Cloud Messaging nesnesini örneklerken
// bizim için üretilen server key değerini veriyoruz
var fcm = new FCM('AAAAE_Q0RTw:APA91bFpJDSrWy53p4nhmMrlaDuTHIW5YkQPmACUnBwIiBzlQ4bCoHYtPhKds6QY8a5GOhC83yRck94HONe9hQRFcS9ElzfDZ_sM9TLyOMs_2AXNr_ebsAPjdT4E5mRjX9NQNdYf3MRO');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    // CORS problemi yaşamamak için gerekli header tanımlamaları yapılır
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
})

//abonelerin ID bilgilerini tutacağımız array. 
// Bunun yerine daha kalıcı bir repository tercih edilebilir
var subscribers = []

// Web uygulaması HTTP Post ile subscriptionID gönderdiğinde çalışan metod 
app.post('/subscribers/', function (req, res) {
    // Mesaj gövdesinden abonelik bilgisini almaya çalışr
    if (!req.body.hasOwnProperty('subscriptionid')) {
        res.statusCode = 400;
        res.send('Gönderilen bilgilerde eksik veya hata var');
        return;
    }
    // bulduysan diziye ekle ve başarılı olduğu bilgisini ilet
    subscribers.push(req.body.subscriptionid)
    res.statusCode = 200; //HTTP 200 Ok basıyoruz
    res.send('ID alındı');
});

// Web uygulaması abonelikten çıkarken HTTP Delete ile çağırdığı metod
app.delete('/subscribers/:id', function (req, res) {
    // dizideki indis değerini URLden gelen id değerine göre bul
    const index = subscribers.indexOf(req.params.id)
    // varsa diziden çıkart
    if (index !== -1) {
        subscribers.splice(index, 1)
    }
    res.statusCode = 200;
    res.send('ID silindi');
});


/*
    Abonelere bildirim göndermek için tetiklenen REST metodu
    localhost:8080/news/push çağrısı geldiğinde çalışır.
*/
app.get('/news/push', function (req, res) {
    // Aboneler için mesaj hazırlanır
    var message = {
        registration_ids: subscribers,
        collapse_key: 'i_love_this_game',
    };
    // Firebase Cloud Messaging üzerinden mesaj gönderilir
    fcm.send(message, function (err, response) {
        if (err) {
            console.log(err)
        } else {
            console.log("Mesaj başarılı bir şekilde gönderildi: ", response);
        }
    });
    res.sendStatus(200);
});

app.listen(8080);
console.log('Pusher API servisi 8080 üstünden dinlemede');