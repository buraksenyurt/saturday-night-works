# Bootstrap Grid Sistemini Tanımak

Bootstrap ile önyüz tasarımları çok hoş bir hale gelebiliyor. Frontend tarafının bir acemisi olarak şirket bünyesindeki tasarımlarda da kullanılan bootstrap'i örnekler ile tanımak istedim. Temel bir kaç şey biliyor olsam da bilmediğim çok şey var. Takip ettiğim örnekten yararlanarak Grid sistemini anlamaya çalıştım.

## Ön Hazırlıklar

İşe 

```
npm init
```

komutu ile başladım. Sonrasında index.html dosyasını oluşturdum. Çalışma için Bootstrap'i deneyimleyeceğim bir önyüz yeterliydi çünkü. Bootstrap'i kullanmaya başlamak için bower veya muadili bir araçtan yararlanılabilinir.

```
bower i bootstrap
```

> Bower yoksa npm aracı ile de yükleme yapılabilir

Yükeleme tamamlandıktan sonra, bower_components\bootstrap\dist\js adresine inen bootstrap.min.css ile bootstrap.min.css.map dosyalarını aldım ve kolaylık olsun diye css klasörü içerisine attım.

![Örnek Ekran Görüntüsü](sample-screen-shot.png)

## sd'ler ne anlama geliyor (Burası Copy-Paste)

Bootstrap tasarımında sd'lerin bir anlamı var. Kısaca aşağıdaki gibi özetlenmekteler.

- .col-sm for larger mobile phones (devices with resolutions ≥ 576px);
- .col-md for tablets (≥768px);
- .col-lg for laptops (≥992px);
- .col-xl for desktops (≥1200px)

## Neler Öğrendim?

- Temel class kullanımlarını
- Grid içeriklerinin nasıl yerleştirildiğini
