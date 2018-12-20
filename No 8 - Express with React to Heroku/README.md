# Express, React ve Heroku

Bu örnekteki amacım node/Express servisi kullanan basit bir React uygulamasını Heroku üzerine deploy etmekti.

## Ön hazırlıklar

Tabii öncelikle Heroku üzerinde bir hesap açmam gerekti. Hesap açıldıktan sonra West-World'e(Ubuntu 18.04, 64bit) heroku CLI kurulumu da yaptım. 

```
sudo snap install --classic heroku
```

Kurulum sonrası login olmam gerekti. 

```
heroku login -i
```

komutu sonrası credential bilgilerim soruldu. Email ve şifre. _(-i parametresinizi heroku login bilgilerimin kalıcı olması için kullandım)_

Ön hazırlıklar sonrası kodlamaya başladım. Nitekim Heroku için tekrar bir şeyler yapacaktım.

## Uygulama hazırlıkları

Uygulamayı app isimli klasörde oluşturmaya karar verdim. 

```
npm init
```

ile ilk hazırlıkları yaptım. Sonrasında gerekli paketleri kurdum.

```
npm i -g express --save
npm i -g nodemon --save-dev
```

express servis tarafını kolay kullanabilmemiz için gerekli özellikleri sunan paket. nodemon ile de node.js tarafında yapılan değişikliklerin otomatik olarak algılanmasını sağlayacağız. Yani uygulamayı tekrar tekrar başlatmamıza gerek kalmadan değişikliklerimizi yapabileceğiz.

