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


## Neler Öğrendim