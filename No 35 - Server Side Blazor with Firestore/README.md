# Sunucu Bazlı Blazor Uygulaması ve Firestore Kullanımı

Blazor client-side web framework olarak düşünülebilir _(Component ve DOM etkileşiminin aynı process içerisinde gerçekleşmesi)_ ancak process'lerin ayrılması konusunda da esnektir. Öyle ki, Blazor'u bir Web Worker içinde çalıştırıp UI thread'inden ayrıştırılabileceği ifade edilmektedir. Diğer yandan 0.5 sürümü ile birlikte Blazor uygulamalarının sunucu tarafında çalıştırılması mümkün hale gelmiştir. Yani .Net Core ile etkileşimde olacak şekilde Blazor bileşenlerini _(component)_ sunucu tarafında çalıştırabiliriz. Burada .Net tarafı WebAssembly yerine CoreCLR üzerinde koşar ve .NET ekosisteminin tüm nimetlerinden _(JIT, debugging vb)_ yararlanabilir. UI tarafı ile etkileşimde olayların ele alınması ve Javascript Interop çağrıları için SignalR bağlantılarından yararlanılır.

![assets/credit_10.png](assets/credit_10.png)

Benim amacım Server Side tipinden bir Blazor uygulamasının Ubuntu gibi bir platformda nasıl geliştirilebileceğini öğrenmek ve bunu yaparken de Google Cloud Firestore'u kullanarak basit CRUD operasyonları içeren bir ürün tasarlamak.

## Ufak Tefek Notlar

Server Side Blazor'un belli avantajları da var tabi.

- Uygulama download boyutu nispeten küçülür
- Blazor bileşenleri _(component)_ .Net Core uyumlu sunucu kabiliyetlerinin tamamını kullanabilir
- Debugging ve JIT Compilation imkanları sağlanır
- Server-Side Blazor tarafı Mono WebAssembly yerine .Net Core process'i içinde çalışır ve WebAssembly desteği olmayan tarayıcılar için de bir açık kapı bırakır
- UI tarafının güncellemeleri SignalR ile gerçekleşir ve gereksiz sayfa yenilemeleri olmaz
- _(Eksi puan)_ UI etkileşimi için SignalR kullanılması ağ üzerinde ekstra hareket anlamına gelir.

## Ön Gereksinimler

Visual Studio Code'un olduğu WestWorld'de _(Ubuntu 18.04,64bit)_ Visual Studio 2017/2019 nimetleri olmasa da Server Side Blazor uygulamaları geliştirebiliriz. Bunun için terminalden aşağıdaki komutu vermek yeterlidir.

```
sudo dotnet new --install "Microsoft.AspNetCore.Blazor.Templates"
dotnet new --help
```

![assets/credit_1.png](assets/credit_1.png)

Görüldüğü gibi 'new' şablonlarına Blazor eklentileri geldi.

## Cloud Firestore Tarafının Hazırlanması

Öncelikle [Firebase Console'a](https://console.firebase.google.com/) gidilir ve yeni bir proje oluşturulur. Ben aşağıdaki özelliklere sahip enbiey _(NBA)_ isimli bir proje oluşturdum.

![assets/credit_2.png](assets/credit_2.png)

Ardından database sekmesinden 'Create Database' seçeneğini kullanarak ilerledim. Security rules penceresinde 'Start in locked mode' seçeneğini işaretli bıraktım.

![assets/credit_3.png](assets/credit_3.png)

Varsayılan olarak 'Cloud Firestore' tipinden bir veri tabanı oluşturulur _(Realtime Database tipinide kullanabilirdik)_

Sonrasında bir koleksiyon _(collection)_ ve örnek bir doküman _(document)_ ile ilk veri girişimi yaptım.

![assets/credit_4.png](assets/credit_4.png)

![assets/credit_5.png](assets/credit_5.png)

![assets/credit_6.png](assets/credit_6.png)

Yazılacak Blazor uygulamasının _(başka uygulamalar içinde benzer durum söz konusu aslında)_ Firestore veri tabanını kullanabilmesi için Credential ayarlamalarının da yapılması gerekiyor. Yeni açılan projenin Service Account'u için bir key üretmemiz lazım. Öncelikle [Google IAM adresine]( https://console.cloud.google.com/iam-admin/) gidip projeyi seçtim ve ardından istediğim service account'u işaretleyip üç nokta düğmesini kullanarak Create Key dedim.

![assets/credit_7.png](assets/credit_7.png)

Gelen penceredeki varsayılan JSON seçimini olduğu gibi bıraktım.

![assets/credit_8.png](assets/credit_8.png)

![assets/credit_9.png](assets/credit_9.png)

İndirilen json uzantılı dosya içeriği Blazor uygulaması için gerekli olacak.

## Server Side Blazor Uygulamasının İnşası

>throw new NotImplementedException();

## Kodda Yapılan Değişiklikler

>throw new NotImplementedException();

## Çalışma Zamanı

>throw new NotImplementedException();

## Neler Öğrendim

>throw new NotImplementedException();