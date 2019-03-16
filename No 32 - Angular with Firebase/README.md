# Cloud Firestore ile Angular Kullanımı

Angular tarafına yavaş yavaş alışmaya başladım. Yine de fazladan idman yapmaktan ve tekrar etmekten zarar gelmez. Bu sefer temel CRUD _(Create Read Update Delete)_ operasyonlarını Firebase Firestore üzerinden icra ederken Angular'da koşmaya çalışacağım. Amaçlarımdan birisi de servis tarafında Form kontrolü kullanabilmek. Örneği her zaman olduğu gibi WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde yazacağım _(ahch-to sistemine geçmeden önce oradaki son örneklerim diyebilirim)_

## İlk Hazırlıklar

Sistemimizde Angular CLI yüklü olmalı. Değilse aşağıdaki ilk terminal komutu ile yükleyebiliriz.

```
sudo npm install -g @angular/cli
ng new quick-auction
npm i --save bootstrap firebase @angular/fire
cd speed-sell
ng g c products
ng g c product-list
ng g s shared/products
```

Takip eden komutlara gelirsek. ng new ile quick-action isimli yeni bir Angular projesi oluşturmaktayız. Sorulan sorularda Routing seçeneğine No dedim ve Style olarak CSS'i seçili bıraktım. Nitekim bootstrap kullanmaya çalışacağım. npm i ile başlayan komutlarda stil için bootstrap, Google'ın Firebase tarafı ile konuşabilmek içinde firebase ve firestore veri tabanı iletişimi için @angular/fire paketlerini ekliyoruz. ng g ile başlayan komutlarda iki bileşen _(component)_ ve her iki bileşen için ortaklaşa kullanılacak bir servis oluşturuyoruz. Bu servis temel olarak firestore veri tabanı ile olan iletişim görevlerini üstlenecek. _(Malum CRUD adımlarını Firestorm'a yansıtacağız)_

## Firebase Tarafı _(Cloud Firestore)_

Firebase tarafında yeni bir proje açıp içerisinde test amaçlı bir Firestore veritabanı yaratmalıyız. [Bu adresten](https://console.firebase.google.com/) Firebase Console'a gidelim ve örnek bir proje üretelim.

![assets/credit_1.png](assets/credit_1.png)

Sonrasında Database menüsünden veya kocaman turuncu kutucuk içerisindeki Cloud Firestorm bölümünden hareket ederek yeni bir veri tabanı oluşturalım. Aşağıdaki ekran görüntüsünde olduğu gibi veri tabanını Test modunda açabiliriz.

![assets/credit_2.png](assets/credit_2.png)

Şimdi Angular uygulamamız ile Firebase tarafını tanıştırmalıyız. Project Overview kısmından hareket ederek 

![assets/credit_3.png](assets/credit_3.png)

kırmızı kutucuktaki düğmeye basalım. Karşımıza gelen ekrandaki config içeriğini uygulamamızın environment.ts dosyası içerisine almamız gerekiyor.

![assets/credit_4.png](assets/credit_4.png)

## Yapılan Değişiklikler

- Bootstrap kullanabilmek için angular.json dosyasındaki style elementi değiştirildi
- app.module.ts, app.component.html dosyalarında değişiklikler yapıldı
- products.service.ts dosyasında temel CRUD operasyonlarına yer verildi
- products.component.cs, products.component.html, product-list.component.ts, product-list.component.html isimli bileşenlerin önyüz ve typescript kodlamaları yapıldı
- environment.ts _(Firestore bağlantısı için gerekli apiKey, databaseUrl, senderId, projectId gibi bilgiler eklendi)_

## Çalışma Zamanı

Uygulamayı çalıştırmak için terminalden

```
ng serve
```

komutunu vermemiz yeterlidir. WestWorld testlerinde ortaya çıkan ekran görüntüsü aşağıdaki gibidir.

![assets/credit_5.png](assets/credit_5.png)

Örneğin ilgi çekici yanlarından birisi de, önyüz ve Firestore tarafı tarafının eş zamanlı güncel kalabilmeleridir. Firestore Console'undan eriştiğimiz dokümanlarda yapacağımız değişiklikler anında önyüz tarafına push edilir, önyüzde yaptığımız değişiklikler de benzer şekilde Firestore tarafına yansır. Bunu denemenizi öneriririm. + ve - düğmeleri ile güncel fiyat bilgisini arttırma veya azaltma işlemlerini yapabiliriz. Sil düğmesi tahmin edileceği üzere satışa çıkarttığımız ürünü repository'den kaldırmak içindir.

## Neler Öğrendim

- Bir component üzerindeki element değerlerinin formControlName niteliği yardımıyla servis tarafındaki FormControl nesnelerine bağlanabileceğini
- Firebase üzerinde bir Cloud Firestore veri tabanının nasıl oluşturulabileceğini
- Uygulamanın Firebase tarafı ile haberleşebilmesi için gerekli konfigurasyon ayarlarının nereye konulması gerektiğini ve nasıl çağırılabildiğini
- Firestore ve önyüzün birbirlerinin değişikliklerini anında görebildiklerini
- Bileşenlerdeki kontrollere olay metodlarını nasıl bağlayabileceğimizi
- firestore paketinin temel CRUD komutlarını