# Saturday Night Works

## UPDATE

Pandemi öncesi zamanlardan kalma bu reponun üzerinden yıllar geçti. Zamanla, deneysel çalışmalarda yer alan birçok kütüphane güncellendi hatta kaldırıldı. Sevgili **github dependbot** açıklar içeren paketleri yükseltmem için sürekli uyarılarda bulundu. Artık güvenlik zafiyetlerini temizleme ve uygulamaları güncelleme zamanı. Ancak sorun şu ki paketler güncellenince geriye uyumluluk sorunları *(backward compatibility)* ortaya çıkabilir. Dolayısıyla karşımda yeni bir meydan okuma var; her çalışmayı bugünün şartlarında tekrar değerlendirmek *(Özellikle **dependebot** alarmına düşen bulguların yer aldığı örnekleri)*

Bu amaçla yeni bir branch *(fSWEUpdates)* açıp ilerlemeye karar verdim. Değişiklikler **CHANGELOG.md** dosyalarında yer alacak. Ne yazık ki bazı bulgular köklü değişiklikler gerektiriyor. Örneğin **Angular 11**'den **Angular 21**'e geçiş yapmak gibi. Bu birçok paketi ve kodu da etkiliyor. Çok zorlayacı noktalarda yoğun mesai harcamaktansa doğrundan yapay zeka asistanlarından yardım almayı planlıyorum *(ki ağırlıkla öyle oldu)*. Uygulamaların çalıştığını görmek, tüm testlerden ve güvenli kod taramasından geçmesini sağlamak yeterli diye düşünüyorum.

**README** içeriklerindeki orjinal anlatımları koruyacağım, belki yazım hatalarını düzeltirim. Ancak günümüz şartlarında ayağa kaldırmak için ne gibi değişiklikler yapıldığını **CHANGELOG.md** dosyalarında tutabiliriz.

---

<img src="tim-foster-387975-unsplash.jpg" width="1024" height="658">

Photo by [Tim Foster](https://unsplash.com/@timberfoster) on [Unsplash](https://unsplash.com/)

Bu resimdeki manzara ile karşı karşıya değildim belki de ama o yaz gecesi, sahil kenarında oturmuş şehir ışıkları belli belirsiz görülebilen Tekirdağ kıyılarına bakıyordum. Saat gece yarısını çoktan geçmişti. Yazın bitmesine yakın günlerdi. Okullar açıldığı için ada artık çok daha sakindi. Sessizlik benim hoşuma gidiyordu. Henüz senenin ortasıydı belki ama 2019 yılında neler yapmalıyım diye düşünmeden edemiyordum. Makale yazmak artık yorucu olmaya başlamıştı. Oysaki kendim için öğrendiğim şeyleri paylaşmak bu kadar yorucu olmamalıydı. Lakin ivmenin aşağıya doğru kaymakta olduğunun farkındaydım. Eskisi kadar hızlı anlayamıyordum. Okuma hızım da düşmüştür. Ama öğrenmekten vazgeçmek istemiyordum.

Sonunda aklıma bir fikir geldi. Makaleye dökemediğim ama kısa kısa notlar alarak deneyimlediğim örnekleri github depomda tutabilirdim. Üstelik kaynakçam oldukça geniş ve zengindi. En nihayetinde 2018 sonlarında başladığım ve 2019 boyunca devam etmeyi planladığım bu repo oluştu. Makale tadında olmasalar bile, her klasör içerisindeki README dosyası gerekli bilgileri içermekte. Amaç, kurulumlar, dikkat edilmesi gereken noktalar, öğrenilenler, konuya özgün notlar vb... Kod dosyalarını da mümkün mertebe yorumlarla desteklemeyi planladım. Üstünü tamamlamaksa repo'yu takip edenlerin göreviydi.

> Faydalı olması için gerekli 3 kritik nokta; monitörün ikiye bölünmesi, copy-paste yasağı ve özgün düşünceyi zorlamak...

## Özetle

Burası takip ettiğim kaynaklardaki örneklere ait çalışmaların bulunduğu kod deposudur. Genellikle Cumartesi geceleri beslenir ***(Konunun uzunluğu veya içimdeki isteğe göre farklı günlerde olabilir ama ilk tercihim Cumartesi geceleridir. Haftaiçi konuyu oku, öğren, araştır, motivasyonunu sağla ve Cumartesi gecesi uygula)*** Monitor ortadan ikiye bölünmüş haldedir *(İkinci bir monitör daha alıp Bilgem Çakır'ın yaptığı gibi dikine kullanım moduna geçmekte isteklerim arasında)* Sol tarafta takip edilen yazı, sağ tarafta çoğunlukla Visual Studio Code açıktır. Örnekler ağırlıklı olarak WestWorld'de *(Ubuntu 18.04 sistemimde)* icra edilir. Duruma göre MacOS veya Windows geçişleri de olabilir. Denemeler sırasında Copy-Paste yapmam kesinlikle yasaktır ve mutlak suretle örnekleri yorumlayıp anın getirdiği ruh haline göre özelleştirmem gerekmektedir.

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

| **Sıra** | **Konu Başlığı** | **Tamamlandı mı?** | **2026 Upgrade Durumu** |
| --- | --- | --- | --- |
| **41** | Bir Python web uygulamasını git deploy yöntemi ile Azure'da yayınlamak | Ok | - |
| **40** | Socket.IO kullanılan bir React uygulaması yazmak | Ok | - |
| **39** | Nedir bu Travis-CI? | Ok | - |
| **38** | Appollo Server ile bir GraphQL servisi geliştirmek | Ok | Ok |
| **37** | Heroku üzerinde bir Hasura GraphQL Engine geliştirmek ve Vue.js tabanlı bir istemciden kullanmak | Ok | Ok |
| **36** | SQLite ile çalışan, Flask tabanlı bir Python uygulaması geliştirmek | Ok | - |
| **35** | Cloud Firestore CRUD operasyonlarını Server Side çalışan bir Blazor uygulamasında icra etmek | Ok | - |
| **34** | Azure SignalR servisini bir Azure Function ile kullanarak abonelere bildirimde bulunmak | Ok | - |
| **33** | KONG Api Gateway aracını kurcalamak. Nedir bu KONG? *(Sadece Proxy olarak ele alındı)* | Ok | - |
| **32** | Angular, Firebase Firestore ve CRUD işlemleri | Ok | Ok |
| **31** | Firebase Cloud Messaging ile bir PWA üzerinde Push Notification uygulamak | Ok | - |
| **30** | Biraz daha Angular deneyimi kazanmak için basit bir oyun *(Çok çok basit :) )* yazmaya çalışmak | Ok | Ok |
| **29** | Angular ön yüzü ve Node sunucusu arasında Socket.IO yardımıyla soket haberleşmesi gerçekleştirmek | Ok | Ok |
| **28** | Angular ile bir PWA uygulaması geliştirmek | Ok | Ok |
| **27** | Firebase ile Google Cloud Functions kullanımı | Ok | - |
| **26** | Microsoft Custom Vision Python SDK'sı ile imaj sınıflandırması yapmak | Ok | - |
| **25** | AlaSQL veritabanını Node.Js ile kullanmak | Ok | - |
| **24** | Bir Asp.Net Core Web API uygulamasını Minikube üzerinde koşturmak | Ok | - |
| **23** | Asp.Net Core Tarafında Gantt Chart'lar oluşturmak | Ok | - |
| **22** | Bir WebAPI servisinde SQLite ile birlikte Dapper Micro ORM kütüphanesini kullanmak | Ok | - |
| **21** | Asp.Net Core'da Razor Pages kullanımı | Ok | - |
| **20** | Python log'ları için ELK Kullanımı | Ok | - |
| **19** | Blazor ile tanışma | Ok | - |
| **18** | Asp.Net Core'da arka plan görevleri | Ok | - |
| **17** | Python tarafında Concurrency kullanımı | Ok | - |
| **16** | Vue ile Desktop uygulaması oluşturmak *(Electron benzeri)* | Ok | Ok |
| **15** | Briaz daha GraphQL *(Graphpack kullanımı, Mutations)* | Ok | - |
| **14** | Typescript ile REST Api geliştirmek *(FortJs ile)* | Ok | - |
| **13** | MEVN *(MongoDb, Express, Vue.Js, NodeJS)* deneyimini yaşatacak bir Hello World yazmak | Ok | Ok |
| **12** | Flask-RESTPlus ile Python'da REST Api geliştirmek | Ok | - |
| **11** | GraphQL'i NodeJS ile kullanmaya çalışmak | Ok | - |
| **10** | Single-File Components ile Vue.js uygulaması geliştirmek | Ok | Ok |
| **09** | Angular ile basit bir Todo uygulaması yazmak | Ok | Ok |
| **08** | Express kullanan bir React uygulamasını Heroku'da yayınlamak | Ok | - |
| **07** | Node.js, MongoDB, Fastify ve Swagger kullanılan bir uygulama yazmak | Ok | Ok |
| **06** | Bir NodeJS sunucusunu ölçeklendirmek | Ok | - |
| **05** | Web sayfasında Bootstrap Modal Popup kullanmak | Ok | - |
| **04** | Visual Studio Code için Snippet yazmak *(Bir öğle vakti deneyimlendi)* | Ok | - |
| **03** | Go ve Vue.js kullanarak haber akışı yapmak | Ok | - |
| **02** | Asp.Net Core ile MongoDB kullanmak | Ok | - |
| **01** | Bootstrap Grid sistemini anlamak | Ok | - |

> MD dosyasını formatlarken [şu adresten](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) yararlanıyorum.
