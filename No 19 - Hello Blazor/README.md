# Blazor ile Hello World Uygulaması Geliştirmek

Amacım Microsoft'un deneysel olarak geliştirdiği Blazor çatısı _(Web Framework)_ ile C#/Razor _(Razor HTML markup ve C#'ın bir arada kullanılabildiği syntax olara düşünülebilir. Bu sayede C# ve HTML kodlamasını aynı dosyada intellisense desteği ile ele alabiliriz)_,HTML ve WebAssembly tabanlı web uygulamalarının nasıl geliştirilebileceğini Hello World diyerek deneyimlemek. Blazor ile geliştirilen uygulamalar WebAssembly desteği ile browser üzerinde koşuyor. WebAssembly yüksek performanslı web uygulamaları geliştirilmesindeki öncü akımlardan. İlk hedef basit bir uygulamayı inşa edip ayağa kaldırabilmek.

>Blazor, .Net ile geliştirilmiş Single Page Application'ların, WebAssembly desteği yardımıyla tarayıcı üzerinde çalışmalarına olanak sağlayan bir Web Framework olarak düşünülebilir.

Net'i Browser üzerinde kullanabilmek. İşte bütün mesele bu :) Bir .Net kodunu tarayıcı üzerinde çalıştırmanın yolu yeni nesil teknolojilerden olan wasm'ı _(WebAssembly)_ kullanmaktan geçiyor. Client Side ve Serve Side Hosting modelleri söz konusu. Client-Side modelinde, C#/Razor ile geliştirilip derlenen .Net Assembly'ları, .Net Runtime'ı ile birlikte tarayıcıya indiriliyor. Sunucu bazlı modele bakıldığında, Razor component'leri sunucu tarafında konuşlanırken UI, Javascript ve olay _(event)_ çağrıları için SignalR devreye giriyor. 

Esasında uygulamalar Component bazlı geliştirilmekte. Bir component bir C# sınıfıdır ve Blazor açısından bakıldığında genellikle bir cshtml dosyasıdır. _(Elbette bir C# dosyası da olabilir)_

>WebAssembly koduna derlenen uygulamalar herhangibir tarayıcıda yüksek performansla çalışabilirler.

## Gereksinimler

Pek çok kaynak konuyu Visual Studio üzerinde incelemekte. Orada bir Web projesi açarken şablon kısmında Blazor'u seçmek yeterli. Ancak ben yabancı topraklardayım ve West-World'de Linux ile en yakın arkadaşı Visual Studio Code var. Bu nedenle işe aşağıdaki gibi başlamak gerekiyor.

```
dotnet new --install "Microsoft.AspNetCore.Blazor.Templates"
dotnet new blazor -o HelloWorld
```

Öncelikle blazor için gerekli proje şablonunu indiriyoruz. Ardından blazor tipinden hazır bir proje iskeletini oluşturuyoruz.

>Hemen ilgili klasöre girip _dotnet run_ ile uygulamayı çalıştırıp deneyebiliriz. Uyguluma localhost:5000 numaralı porttan hizmet verecektir. 

## Notlar

Sayfaları incelemekte yarar var. Index, Counter ve FetchData yönlendirmeleri sonrası çalışan aynı isimli cshtml içeriklerine odaklanmak gerekiyor. Söz gelimi Counter sayfasında düğmeye bastıkça sayaç değeri artmakta. Ancak bu gerçekleşirken sayfa yeniden yüklenmiyor ki bunun için normalde Client-Side Javascript koduna yazılması gerekiyor. Blazor açısından baktığımızda olaya, kodlamanın Javascript değil de C# ile yapıldığını fark etmiş olmamız lazım. 

İlgili sayfada oynayarak farklı sonuçlar elde etmeye çalışabiliriz_(Ben hemen bir kaç değişiklik yapıp konuyu anlamaya çalıştım)_

![cover_1.png](cover_1.png)

>CSS tarafında bootstrap hazır olarak geliyor. Sol taraftaki navigation menu'yü kurcalamak istersek, Shared klasöründeki NavMenu.cshtml ile oynamak yeterli. Her şeyin giriş noktası olan index.html içerisinde blazor.webassembly.js javascript dosyası için bir referans var _(Bu niye var öğrenmek lazım)_

## Yapılanlar

- Pages klasörüne Book.cshtml isimli bir dosya eklendi.
- NavMenu.cshtml içeriği ile birazcık oynandı.
- Kitapları temsil eden book sınıfı eklendi.

## Neler Öğrendim

- Bir Blazor proje şablonunun temel bileşenlerini.
- Blazor tarafında Bootstrap kullanıldığını.
- Razor'da sayfa bileşenleri ile fonksiyonların nasıl etkileşebileceğini.