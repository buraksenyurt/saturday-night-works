# Razor Dünyasına Atılan İlk Adımlar

Amacım, Microsoft'un Asp.Net Core MVC tarafında özellikle sayfa odaklı senaryolar için geliştirdiği Razor çatısını tanımak. Bu çatıda sayfalar doğrudan istemci taleplerini karşılayıp arada bir Controller'a uğramadan sayfa modeli _(PageModel)_ ile konuşabiliyorlar. Razor sayfaları SayfaAdı.cshtml benzeri olup kullandıkları sayfa modelleri SayfaAdi.cshtml.cs şeklinde oluşturuluyorlar. Genel hatları ile URL eşleştirmeleri aşağıdaki gibi oluyor.

| Örnek Url Adresi                            | Karşılayan Razor Page         | PageModel                        |
|---------------------------------------------|-------------------------------|----------------------------------|
| /Book                                       | pages/Book.cshtml             | pages/book.cshtml.cs             |
| /Category/Product                           | pages/Category/Product.cshtml | pages/Category/Product.cshtml.cs |
| /Category  (Yandaki gibi de tasarlanabilir) | pages/Category/Index.cshtml   | pages/Category/Index.cshtml.cs   |
| /Category/Index                             | pages/Category/Index.cshtml   | pages/Category/Index.cshtml.cs   |
| /Index                                      | pages/Index.cshtml            | pages/Index.cshtml.cs            |
| /                                           | pages/Index.cshtml            | pages/Index.cshtml.cs            |

>Çalışmada veri girişi yapılabilen basit bir form tasarlayıp, Razor'un kod dinamiklerini anlamak istiyorum. Veriyi InMemory veritabanında tutmayı planlıyorum.

## Başlangıç

Örneği West-World _(Ubuntu 18.04 64bit)_ üzerinde deniyorum. Linux tarafında Razor uygulamalarını oluşturmak için .Net Core 2.2'ye ihtiyacımız var. Kodları geliştirmek içinse Visual Studio Code'dan yararlanabiliriz. Projeyi oluşturmak için aşağıdaki komutu vermek yeterli.

```
dotnet new webapp -o MyBookStore
```

Oluşan uygulama iskeletini incelersek Razor sayfaları ve ilişkili model sınıflarının Pages klasöründe konuşlandırıldığını görürüz. Static HTML dosyaları, javascript kütüphaneleri ve CSS içerikleri de wwwroot altında tutulur.

## Yapılan Geliştirmeler

- Data klasörü oluşturulup StoreDataContext.cs ve Book.cs dosyaları eklendi. _(Entity tarafı)_
- Pages klasörü altına AddBook.cshtml ve AddBook.cshtml.cs dosyaları eklendi. _(Razor Page ve PageModel tarafı)_