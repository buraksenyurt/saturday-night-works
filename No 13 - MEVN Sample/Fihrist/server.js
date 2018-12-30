var express = require('express')
var morgan = require('morgan')
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var config = require('./app/config')
var router = require('./app/router')

mongoose.connect(config.conn, { useNewUrlParser: true }) // konfigurasyon dosyasındaki bilgi kullanılarak mongoDb bağlantısı tesis edilir

// static dosyaların public klasöründen karşılanacağı belirtilir
app.use(express.static(path.join(__dirname, '/public')))

// Middleware katmanına morgan'ı enjekte ederek loglamayı etkinleştirdik
app.use(morgan('dev'))

// İstemci taleplerinden gelecek Body içeriklerini JSON formatından kolayca ele almak için 
// Middleware katmanına body-parser modülünü ekledik
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = config.default_port || 8080 // port bilgisi belirlenir. config'de varsa 5003 yoksa 8080

app.listen(port)
app.use('/api', router) // /api adresine gelecek taleplerin router modülü tarafından karşılanacağı belirtilir.

app.get('/', function (req, res, next) {
    res.sendFile('./public/index.html') // eğer / adresine talep gelirse (yani http://localhost:5003/ şeklinde) index.html sayfasına yönlendiriyoruz
})

console.log('Sunucu hazır ve dinlemede')