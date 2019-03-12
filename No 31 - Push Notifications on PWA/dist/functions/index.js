const functions = require('firebase-functions');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FCM = require('fcm-node');

var fcm = new FCM('AAAAE_Q0RTw:APA91bFpJDSrWy53p4nhmMrlaDuTHIW5YkQPmACUnBwIiBzlQ4bCoHYtPhKds6QY8a5GOhC83yRck94HONe9hQRFcS9ElzfDZ_sM9TLyOMs_2AXNr_ebsAPjdT4E5mRjX9NQNdYf3MRO');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
})

var subscribers = []

app.post('/subscribers/', function (req, res) {
    if (!req.body.hasOwnProperty('subscriptionid')) {
        res.statusCode = 400;
        res.send('Gönderilen bilgilerde eksik veya hata var');
        return;
    }
    subscribers.push(req.body.subscriptionid)
    res.statusCode = 200;
    res.send('ID alındı');
});

app.delete('/subscribers/:id', function (req, res) {
    const index = subscribers.indexOf(req.params.id)
    if (index !== -1) {
        subscribers.splice(index, 1)
    }
    res.statusCode = 200;
    res.send('ID silindi');
});

app.get('/news/push', function (req, res) {
    var message = {
        registration_ids: subscribers,
        collapse_key: 'i_love_this_game',
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log(err)
        } else {
            console.log("Mesaj başarılı bir şekilde gönderildi: ", response);
        }
    });
    res.sendStatus(200);
});

//app.listen(8080); // bunun yerine aşağıdaki satır geldi.
// Nitekim artık HTTP Request'leri express değil google function tarafı ele alacak
exports.app = functions.https.onRequest(app);
