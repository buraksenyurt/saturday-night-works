# Sunucu Bazlı Blazor Uygulaması ve Firestore Kullanımı

Blazor client-side web framework olarak düşünülebilir _(Component ve DOM etkileşiminin aynı process içerisinde gerçekleşmesi)_ ancak process'lerin ayrılması konusunda da esnektir. Öyle ki, Blazor'u bir Web Worker içinde çalıştırıp UI thread'inden ayrıştırılabileceği ifade edilmektedir. Diğer yandan 0.5 sürümü ile birlikte Blazor uygulamalarının sunucu tarafında çalıştırılması mümkün hale gelmiştir. Yani .Net Core ile etkileşimde olacak şekilde Blazor bileşenlerini _(component)_ sunucu tarafında çalıştırabiliriz. Burada .Net tarafı WebAssembly yerine CoreCLR üzerinde koşar ve .NET ekosisteminin tüm nimetlerinden _(JIT, debugging vb)_ yararlanabilir. UI tarafı ile etkileşimde olayların ele alınması ve Javascript Interop çağrıları için SignalR bağlantılarından yararlanılır.

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

## Server Side Blazor Uygulamasının İnşası

>throw new NotImplementedException();

## Cloud Firestore Tarafının Hazırlanması

>throw new NotImplementedException();

## Kodda Yapılan Değişiklikler

>throw new NotImplementedException();

## Çalışma Zamanı

>throw new NotImplementedException();

## Neler Öğrendim

>throw new NotImplementedException();