var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var morgan = require('morgan');
var url = require('url');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ana root'a gelen talepleri index.html'e yönlendiriyoruz
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'), function (err) {
        res.status(500).send(err);
    })
});

// login işlemi başarılı olduğunda gidilecek sayfa
app.get('/wellcome', function (req, res) {
    // querystring'den gelen id parametresi listede var mı kontrol et.
    // yoksa 403 hatası ver
    var urlParts = url.parse(req.url, true);
    var id = urlParts.query.id;
    if (idList.indexOf(id) > -1) {
        res.sendFile(path.join(__dirname + '/wellcome.html'));
    } else {
        console.log('Kullanıcı için üretilen ID listede bulunamadı.');
        res.status(403).send();
    }
});

var idList = [];
var guidCreator = require('uuid/v1');

// login sürecini ele alan metod
// request'ten gelen json içeriğine bakarak ilerliyoruz
app.post('/login', function (req, res) {
    //body'den kullanıcı adı ve şifre bilgisini al
    var body = req.body;
    // Kullanıcı bilgisini veritabanı veya başka bir depodan kontrol edebiliriz
    if (body.uname == "buraks" && body.pwd == "1234") {
        // Kullanıcı için üretilecek guid bilgisini belli süre boyunca fiziki bir depoda saklayabiliriz
        // Burada ucuza kaçtık
        var id = guidCreator();
        idList.push(id);
        res.end(id);
    }
    else {
        res.status(401).send();
    }
});

app.listen(5001);
console.log('server is online on port 5001');