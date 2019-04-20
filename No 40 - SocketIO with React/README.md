# Socket.IO ve React.js Kullanımı

Bir süre önce eski bir meslektaşım OBD2 portlarından nasıl bilgi okuyabileceğimizi sormuştu. Bu konuyu araştırırken kendimi çok farklı bir yerde buldum. OBD2 portu ile bir arabadan veri almak mümkün. Peki bir yarış sırasında tüm araçların hız, motor sıcaklığı, anlık devir vb bilgilerini bu şekilde bir yerlere aktarabildiğimizi düşünsek. Bu verileri yarışı mobil uygulamalardan takip edenlere anında gönderimi için nasıl bir yol izleyebiliriz? İşte araştırma sırasında geldiğim nokta buydu. Donanımsal gereksinimleri bir kenara bırakırsak bunun minik bir POC çalışmasını yapmak istedim. 

En ideal senaryolardan birisi Web Socket kullanımıydı. Socket.IO kütüphanesi bu amaçla kullanılabilirdi. Bir yarış aracının WebSocket haberleşmesi ile veri yayınlayacağını düşünelim. Haberleşme ağı üzerinde olan bir sunucu uygulama da verileri abone olan istemcilere gönderecek. Veri yayıncısı ve broadcast yönetimini üstlenecek sunucu için Node.js, görsel arayüzle yarış araçlarının gönderilen bilgilerine bakacak istemci tarafı içinse bir React uygulaması geliştirmeye karar verdim.

![assets/credit_1.jpg](assets/credit_1.jpg)

>Bizim senaryomuzda tek bir yarış aracının bilgi yayınladığını varsayıyoruz. Şekildeki gibi n sayıda aracın ve dinleyicinin olduğu bir senaryoda, yayın yapan araçların verilerini diğerleri ile karışamayacak şekilde konsolide ederek göndermemiz gerekir ki istemciler n sayıda aracın verisini ya da istedikleri belli bir aracın verisini kullanabilsin.

## Ön Hazırlıklar

Örneği her zaman olduğu gibi WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde geliştirmekteyim. Sistemde node.js, npm ve react projesi oluşturmak için gerekli ekipmanlarım mevcut. Dolayısıyla hızşı bir şek,ilde proje iskeletini aşağıdaki terminal komutlarını kullanarak oluşturabilirim.

```
mkdir Zion
mkdir VehicleDataPublisher
cd Zion
npm init
npm i --save express socket.io
touch server.js
cd ..
cd VehicleDataPublisher
npm init
npm i --save socket.io-client
touch index.js
cd ..
sudo npx create-react-app dashboard
sudo npm i --save react-d3-speedometer save socket.io-client
```

Zion isimli klasörde sunucu uygulama kodlarımız olacak _(Aslında yayıncı ve aboneler arasında bir veri aktarım organı)_ Veri yayını yapan uygulamamız burayı kullanacak. Sunucu, kendisini dinleyenlere ilgili verileri yayınlayacak. Web Sockets tabanlı bir iletişim söz konusu. Bu nedenle express ve socket.io paketleri kullanılıyor. VehicleDataPublisher uygulaması sembolik olarak veri yayını yapan program kodlarını içeriyor _(Yani yarış aracımızdan veri gönderen parça)_ Socket sunucusu ile haberleşmesi gerektiğinden socket.io-client paketini kullanıyor. Son olarak dashboard isimli bir react uygulamamız var. Bunu yarış aracından yayınlanan veriyi grafik formatında göstermek için kullanacağız. Bu nedenle react-d3-speedometer _(gerekirse benzerleri)_ paketini içeriyor. Pek tabii bu uygulama soket dinleyicisi olarak sunucu ile konuşmak durumunda. Bu nedenle socket.io-client paketini de referans ediyor.

## Yapılanlar

- Zion projesindeki server.js kodlandı
- VehicleDataPublisher projesindeki index.js kodlandı
- dashboard isimli react uygulamasının app.js dosyası kodlandı

## Çalışma Zamanı

En az 3 terminal penceresi ile ilerlemek lazım. Birisinde sunucu, diğerinde publisher ve sonuncusunda da react tabanlı dinleyici çalıştırılmalı. Aşağıdaki terminal komutu ile sunucu ve veri yayıncılarını çalıştırabiliriz. _(Ayrı terminal pencrelerinde tabii ki)_

```
npm run serve
```

React uygulaması içinse 

```
npm run start
```

>React uygulaması başlatıldığında http://localhost:3000 adresi tarayıcıda açılır ve app.js'den render edilen html içeriği buraya basılır

WestWorld üzerinde yakaladığım çalışma zamanına ait iki ekran görüntüsü aşağıdaki gibidir. Arayüzdeki göstergeler her 5 saniyede bir yenilenir.

![assets/credit_2.png](assets/credit_2.png)

![assets/credit_3.png](assets/credit_3.png)

## TODO

- Senaryonun n sayıda araç _(yayıncı)_ için n sayıda istemcide tekil veya toplu halde verinin gösterileceğine dair farklı bir versiyonunu yazmak.

## Neler Öğrendim

- socket.io ile websocket bazlı iletişim trafiğinin node.js'de nasıl tesis edilebileceğini
- socket.on olay dinleyicilerinin ne amaçla ele alındığını
- broadcasting'in nasıl yapıldığını
- disconnect ve connection namespace'lerinin ayrılmış kelimelerden _(reserved words)_ olduğunu _(bunları doğru yazmassak istemciler bağlanamaz veya çevrim dışı olamazlar)_
- node.js tarafında rastgele sayı üretimini
- belirli periyotlarda sürekli olarak çalışan bir fonksiyonun nasıl yazılacağını
- yayıncıların abonelere olan mesajları gönderdiğimiz fonksiyonun bir callback metodu olduğunu
- React bileşeninde state nesne kullanımını
- React üzerinden web socket haberleşmesinin nasıl yapılabileceğini
- component DOM'a bağlandığında hangi olay metodunun tetiklendiğini
- ReactSpeedometer'ın temel kullanımını