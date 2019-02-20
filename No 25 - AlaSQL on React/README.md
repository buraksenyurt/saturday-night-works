# Bir React Uygulamasında AlaSQL Kullanmak

Öğrenecek bir şeyler araştırırken AlaSQL isimli bir çalışma ile karşılaştım. Tarayıcı üzerinde çalışabilen istemci taraflı bir In-Memory veritabanı olarak geçiyor. Tamamen saf Javascript ile yazılmış. Geleneksel ilişkisel veritabanı özelliklerinin çoğunu barındırıyor. Group, join, union gibi fonksiyonellikleri karşılıyor. In-Memory tutulan veriyi kalıcı olarak saklamakta mümkün. Hatta bu noktada localStorage olarak ifade edilen yerel depolama'dan veri okunup tekrar yazılabiliyor. IndexedDB veya Excel'ide fiziki repository olarak kullanabiliyor. Ayrıca JSON nesnelerle çalışabiliyoruz ki bu da NoSQL desteği anlamına gelmekte. Benim amacım onu yalın bir React uygulamasında deneyimlemeye çalışmak.

>[AlSQL](https://github.com/agershun/alasql) açık kaynak kodlu, dokümantasyonu oldukça zengin bir proje. Yine de endüstriyel anlamda olgunlaştığına dair emareler görülmeden canlı ortamlarda kullanmak riskli olabilir. Öncelikle deneysel çalışmalarda ele almakta yarar var.

## Kurulum ve Hazırlıklar

Örneği her zaman olduğu gibi WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde deniyorum. Sistem node yüklü durumda. React uygulamasını kolayca oluşturabilmek için aşağıdaki terminal komutunu kullanabiliriz.

```
npx create-react-app submarine
```

![credit_1.png](credit_1.png)

AlaSQL'i kullanabilmek içinse uygulama klasöründe gerekli npm paketinin yüklenmesi yeterli olacaktır.

```
cd submarine
npm install --save-dev alasql
```

## Yapılanlar

## Çalışma Zamanı

## Neler Öğrendim?