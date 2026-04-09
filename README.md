# Saturday Night Works

## UPDATE

Pandemi öncesi zamanlardan kalma bu reponun üzerinden yıllar geçti. Zamanla, deneysel çalışmalarda yer alan birçok kütüphane güncellendi. Hatta sevgili dependbot sürekli açıklar içeren paketleri yükseltmem için pull request'ler açıp durdu. Artık güvenlik zafiyetlerini temizleme zamanı. Ancak sorun şu ki paketler güncellenince geriye uyumluluk sorunları da ortaya çıkabilir. Dolayısıyla karşımda yeni bir meydan okuma var. Her çalışmayı bugünün şartlarında tekrar değerlendirmek. Özellikle **dependebot** alarmına düşen bulguların yer aldığı örnekleri. Bu amaçla yeni bir branch açıp ilerleyeceğim. Değişiklik olanları da mutlaka dokümante etmeliyim.

---

<img src="tim-foster-387975-unsplash.jpg" width="1024" height="658">

Photo by [Tim Foster](https://unsplash.com/@timberfoster) on [Unsplash](https://unsplash.com/)

Bu resimdeki manzara ile karşı karşıya değildim belki de ama o yaz gecesi, sahil kenarında oturmuş şehir ışıkları belli belirsiz görülebilen Tekirdağ kıyılarına bakıyordum. Saat gece yarısını çoktan geçmişti. Yazın bitmesine yakın günlerdi. Okullar açıldığı için ada artık çok daha sakindi. Sessizlik benim hoşuma gidiyordu. Henüz senenin ortasıydı belki ama 2019 yılında neler yapmalıyım diye düşünmeden edemiyordum. Makale yazmak artık yorucu olmaya başlamıştı. Oysaki kendim için öğrendiğim şeyleri paylaşmak bu kadar yorucu olmamalıydı. Lakin ivmenin aşağıya doğru kaymakta olduğunun farkındaydım. Eskisi kadar hızlı anlayamıyordum. Okuma hızım da düşmüştür. Ama öğrenmekten vazgeçmek istemiyordum.

Sonunda aklıma bir fikir geldi. Makaleye dökemediğim ama kısa kısa notlar alarak deneyimlediğim örnekleri github depomda tutabilirdim. Üstelik kaynakçam oldukça geniş ve zengindi. En nihayetinde 2018 sonlarında başladığım ve 2019 boyunca devam etmeyi planladığım bu repo oluştu. Makale tadında olmasalar bile, her klasör içerisindeki README dosyası gerekli bilgileri içermekte. Amaç, kurulumlar, dikkat edilmesi gereken noktalar, öğrenilenler, konuya özgün notlar vb... Kod dosyalarını da mümkün mertebe yorumlarla desteklemeyi planladım. Üstünü tamamlamaksa repo'yu takip edenlerin göreviydi.

> Faydalı olması için gerekli 3 kritik nokta; monitörün ikiye bölünmesi, copy-paste yasağı ve özgün düşünceyi zorlamak...

## Özetle

Burası takip ettiğim kaynaklardaki örneklere ait çalışmaların bulunduğu kod deposudur. Genellikle Cumartesi geceleri beslenir _**(Konunun uzunluğu veya içimdeki isteğe göre farklı günlerde olabilir ama ilk tercihim Cumartesi geceleridir. Haftaiçi konuyu oku, öğren, araştır, motivasyonunu sağla ve Cumartesi gecesi uygula)**_ Monitor ortadan ikiye bölünmüş haldedir _(İkinci bir monitör daha alıp Bilgem Çakır'ın yaptığı gibi dikine kullanım moduna geçmekte isteklerim arasında)_ Sol tarafta takip edilen yazı, sağ tarafta çoğunlukla Visual Studio Code açıktır. Örnekler ağırlıklı olarak WestWorld'de _(Ubuntu 18.04 sistemimde)_ icra edilir. Duruma göre MacOS veya Windows geçişleri de olabilir. Denemeler sırasında Copy-Paste yapmam kesinlikle yasaktır ve mutlak suretle örnekleri yorumlayıp anın getirdiği ruh haline göre özelleştirmem gerekmektedir.

> Özellikle 41nci örnekle birlikte ahch-to üzerinde geliştirmeler yapmaya başladım.

![ahch-to.png](ahch-to.png)

## Takipçi Ne Yapabilir?

Readme dosyalarından yararlanarak kendi başlangıçlarınızı yapabilir, örnek kodları sağa sola çekiştirip iyileştirebilir ya da farklılaştırabilirsiniz. Ama en nihayetinde keşfetme ve farklı örnekleri anlamaya çalışma kaslarınızı geliştirirsiniz. Hata yapmaktan korkmayın.

## Güncel Liste

Burası işlenecek konu başlıklarının olduğu havuzdur.

- Angular'da kendi Modal pencerelerimizi nasıl oluşturuyoruz?
- Bir Node.js uygulamasında Azure Cosmos DB kullanmak

> Planlanan yazılarda konu başlıkları değişiklik gösterebilir ve örnekler kronolojik sırada işlenmemektedir.

## Üzerinde Çalışılıyor

> throw new CantSelectAnyTopicException("kararsızım");

## Tamamlananlar

Şu ana kadar tamamlayabildiğim örnekler.

- [x] 41 Bir Python web uygulamasını git deploy yöntemi ile Azure'da yayınlamak
- [x] 40 Socket.IO kullanılan bir React uygulaması yazmak
- [x] 39 Nedir bu Travis-CI?
- [x] 38 Appollo Server ile bir GraphQL servisi geliştirmek
- [x] 37 Heroku üzerinde bir Hasura GraphQL Engine geliştirmek ve Vue.js tabanlı bir istemciden kullanmak
- [x] 36 SQLite ile çalışan, Flask tabanlı bir Python uygulaması geliştirmek
- [x] 35 Cloud Firestore CRUD operasyonlarını Server Side çalışan bir Blazor uygulamasında icra etmek
- [x] 34 Azure SignalR servisini bir Azure Function ile kullanarak abonelere bildirimde bulunmak
- [x] 33 KONG Api Gateway aracını kurcalamak. Nedir bu KONG? _(Sadece Proxy olarak ele alındı)_
- [x] 32 Angular, Firebase Firestore ve CRUD işlemleri
- [x] 31 Firebase Cloud Messaging ile bir PWA üzerinde Push Notification uygulamak
- [x] 30 Biraz daha Angular deneyimi kazanmak için basit bir oyun _(Çok çok basit :) )_ yazmaya çalışmak
- [x] 29 Angular ön yüzü ve Node sunucusu arasında Socket.IO yardımıyla soket haberleşmesi gerçekleştirmek
- [x] 28 Angular ile bir PWA uygulaması geliştirmek
- [x] 27 Firebase ile Google Cloud Functions kullanımı
- [x] 26 Microsoft Custom Vision Python SDK'sı ile imaj sınıflandırması yapmak
- [x] 25 AlaSQL veritabanını Node.Js ile kullanmak
- [x] 24 Bir Asp.Net Core Web API uygulamasını Minikube üzerinde koşturmak
- [x] 23 Asp.Net Core Tarafında Gantt Chart'lar oluşturmak
- [x] 22 Bir WebAPI servisinde SQLite ile birlikte Dapper Micro ORM kütüphanesini kullanmak
- [x] 21 Asp.Net Core'da Razor Pages kullanımı
- [x] 20 Python log'ları için ELK Kullanımı
- [x] 19 Blazor ile tanışma
- [x] 18 Asp.Net Core'da arka plan görevleri
- [x] 17 Python tarafında Concurrency kullanımı
- [x] 16 Vue ile Desktop uygulaması oluşturmak _(Electron benzeri)_
- [x] 15 Briaz daha GraphQL _(Graphpack kullanımı, Mutations)_
- [x] 14 Typescript ile REST Api geliştirmek _(FortJs ile)_
- [x] 13 MEVN _(MongoDb, Express, Vue.Js, NodeJS)_ deneyimini yaşatacak bir Hello World yazmak
- [x] 12 Flask-RESTPlus ile Python'da REST Api geliştirmek
- [x] 11 GraphQL'i NodeJS ile kullanmaya çalışmak
- [x] 10 Single-File Components ile Vue.js uygulaması geliştirmek
- [x] 09 Angular ile basit bir Todo uygulaması yazmak
- [x] 08 Express kullanan bir React uygulamasını Heroku'da yayınlamak
- [x] 07 Node.js, MongoDB, Fastify ve Swagger kullanılan bir uygulama yazmak
- [x] 06 Bir NodeJS sunucusunu ölçeklendirmek
- [x] 05 Web sayfasında Bootstrap Modal Popup kullanmak
- [x] 04 Visual Studio Code için Snippet yazmak _(Bir öğle vakti deneyimlendi)_
- [x] 03 Go ve Vue.js kullanarak haber akışı yapmak
- [x] 02 Asp.Net Core ile MongoDB kullanmak
- [x] 01 Bootstrap Grid sistemini anlamak

> MD dosyasını formatlarken [şu adresten](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) yararlanıyorum.
