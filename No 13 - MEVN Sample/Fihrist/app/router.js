// Web API Router sınıfımız
// gerekli modülleri tanımlıyoruz
var express = require('express')
var operator = express.Router()
var contact = require('./contact')

// HTTP Post ile yeni bir contact eklenmesini sağlıyoruz
operator.route('/').post(function (req, res) {
    // request body'den gelen değerlere göre contact oluşturuluyor
    contact.create({
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        birtdate: req.body.birtdate
    }, function (e, c) { //callback fonksiyonu
        if (e) { //hata oluşmuşsa HTTP 400 döndük
            res.status(400).send('kayıt işlemi başarısız')
        }
        res.status(200).json(c) // Hata yoksa HTTP 200 Ok dönüyor ve cevabın içine oluşturulan contact nesnesini gömüyoruz
    }
    )
})

// HTTP Get talebi için tüm kontakların listesini dönüyoruz
operator.route('/').get(function (req, res, next) {
    contact.find(function (e, contacts) {
        if (e) { //hata varsa sonraki fonksiyona bunu yollar
            return next(new Error(e))
        }
        res.json(contacts) // hata yoksa tüm kontaları json serileştirip döner
    })
})

// Belli bir ID'ye ait kontak bilgisini döndürür
// HTTP Get ile çalışır
// Querystring'teki id kullanılır
operator.route('/:id').get(function (req, res, next) {
    var id = req.params.id //id parametresinin değeri alınır
    contact.findById(id, function (e, c) {
        if (e) //hata varsa kayıt bulunanamış diyebiliriz
        {
            return next(new Error('Bu ID için bir kontak bilgisi mevcut değil'))
        }
        res.json(c)
    })
})

// ID bazlı kontak silmek için çalışan fonksiyon
// HTTP Delete kullanılır
operator.route('/:id').delete(function (req, res, next) {
    var id = req.params.id
    contact.findByIdAndRemove(id, function (e, c) {
        if (e) {
            return next(new Error('Bu ID için bir kontak bulunamadığından silme işlemi yapılamadı'))
        }
        res.json('Başarılı bir şekilde silindi')
    })
})

// Güncelleme işlemi
// HTTP Put kullanılır
operator.route('/').put(function (req, res, next) {
    var id = req.body.id
    // önce id'den contact bulunur
    contact.findById(id, function (e, c) {
        if (e) {
            return next(new Error('Güncellenme için bir kayıt bulunamadı'))
        } else { //bulunduysa özellikler body'den gelenler ile değiştirilir

            c.fullname = req.body.fullname ? req.body.fullname : c.fullname
            c.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : c.phoneNumber
            c.location = req.body.location ? req.body.location : c.location
            c.birtdate = req.body.birtdate ? req.body.birtdate : c.birtdate

            // contact yeni haliyle kayıt edilir
            c.save()
            res.status(200).json(c)
        }
    })
})

module.exports = operator