# MongoDb, Express, Vue.js ve Node.js Birlikteliği

Amacım bu 4 enstrümanı kullanarak Web API tabanlı çalışan basit bir web uygulaması geliştirmek. Veriyi tutmak için MongoDB'yi, sunucu tarafı için Node.js'i, Web Framework amacıyla Express'i ve önyüz geliştirmesinde de Vue.js'i kullanmak istedim. Kobay olarakta 90lardan aklıma gelen ve Cobol öğretirlerken gösterdikleri Fihrist modelini seçtim.

## Projenin İskeleti

```
Fihrist/
|----- app/
       |----- config.js
       |----- Routers.js
       |----- Contact.js
|----- public/
       |----- src/
       |----- index.html
|----- server.js
```

app klasöründe modelimiz, yönlendirme paketi ve konfigurasyon dosyamız yer alıyor. public klasöründe html ve gerekirse css, image gibi asset'lere ve vue uygulamasının kendisine yer vereceğiz. server.js tahmin edileceği üzere node server'ımız.

```
mkdir Fihrist
cd Fihrist
mkdir app
mkdir public
touch server.js
```

## Kurulumlar

Sistemde node, npm ve mongodb'nin yüklü olduğunu varsayıyoruz. Kök klasörde,

```
npm init
```

ile başlangıcı yapıp gerekli paket kurulumlarını gerçekleştiriyoruz.

```
npm install --save-dev body-parser express mongoose morgan method-override
```

## Uygulamayı Başlatmak için

```
npm start
```

komutunu vermemiz yeterli.

>Mongodb'nin çalışır olduğundan emin olun. Ben bunun için iki terminal penceresi açıp şu yolu izliyorum.

```
mongod
mongo
db
```

![credit_1.png](credit_1.png)

Sonrasında web arayüzüne erişerek denemelere başlanabilir.

## Servis Testleri

Servis tarafının işlerliğini kontrol etmek için CURL ile aşağıdaki denemeler yapılabilir.

4 tane insert, ardından tüm listenin çekilmesi, sonrasında belli bir id'ye bağlı kontak bilgisinin alınması, derken bir güncelleme ve son olarak da silme.

```
curl -H "Content-Type: application/json" -X POST -d '{"fullname":"M.J.","phoneNumber":"555 55 23","location":"chicago","birtdate":"1963-05-18T16:00:00Z"}' http://localhost:5003/api

curl -H "Content-Type: application/json" -X POST -d '{"fullname":"Çarls Barkli","phoneNumber":"555 55 34","location":"phoneix","birtdate":"1963-05-18T16:00:00Z"}' http://localhost:5003/api

curl -H "Content-Type: application/json" -X POST -d '{"fullname":"meycik cansın","phoneNumber":"555 55 32","location":"los angles","birtdate":"1959-05-18T16:00:00Z"}' http://localhost:5003/api

curl -H "Content-Type: application/json" -X POST -d '{"fullname":"leri börd","phoneNumber":"555 55 33","location":"boston","birtdate":"1956-05-18T16:00:00Z"}' http://localhost:5003/api

curl http://localhost:5003/api

curl http://localhost:5003/api/5c29222522433f0234e71e1b

curl -H "Content-Type: application/json" -X PUT -d '{"id":"5c29222522433f0234e71e1b","fullname":"maykıl cordın"}' http://localhost:5003/api

curl -X DELETE http://localhost:5003/api/5c29222522433f0234e71e1b

```

>ID değeri elbette siz denerken farklılık gösterecektir.

## Neler Öğrendim

