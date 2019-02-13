# Angular ile Basit Bir Görevler Listesi Uygulaması Yazmak

Amacım Angular için basit bir Hello World uygulaması oluşturmak. Güncel Angular bilgim oldukça düşük olduğu için bu tip bir çalışma içerisine girdim diyebilirim. Platform olarak uzun zamandır olduğu gibi yine WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde çalıştım.

Uygulamayı çalıştırmak için aşağıdaki terminal komutunu vermemiz yeterlir.

```
ng server
```

Buna göre http://localhost:4200 adresinden çalışabiliriz.

## Ön Gereklilikler

Makinede node ve npm yüklü durumda. Ayrıca Angular için Command Line Interface(CLI) aracına ihtiyaç var. Kurmak için gerekli terminal komutu ise şöyle.

```
sudo npm install -g @angular/cli
```

Ayrıca önyüz tarafında Bootstrap kullanılıyor. Onu da bower yardımıyla sisteme dahil edebiliriz.

```
bower i bootstrap
```

>Ben bootstrap'i indirdikten sonra gerekli css dosyalarını assets/css altına alıp orayı referans göstermeyi tercih ettim. _(index.html sayfasına bakın)_

## Angular Uygulamasını Oluşturmak

Angular uygulamasını hazır şablonundan üretmek oldukça kolay. Tek yapmamız gereken aşağıdaki terminal komunutunu çalıştırmak. new sonrası gelen parametre tahmin edileceği üzere uygulamamızın adı.

```
ng new life-pbi-app
```

## Yapılan değişiklikler

ng new sonrası oluşan proje içerisinde çok fazla dosya var. Örneği sonradan bakınca anlayabilmek için sadece değişiklik yaptığım dosyaları aşağıdaki listeye ekledim.

- index.html
- app.component.html
- app.component.ts _(typescript tabanlı bileşenimiz)_

## Çalışma zamanı

Uygulamanın çalışma zamanına ait örnek bir görüntü.

![credit_1.png](credit_1.png)

## Neler Öğrendim?

- Typescript ile HTML tarafındaki Angular yapılarının nasıl anlaştığını,
- Bootstrap'i bir Angular projesinde nasıl kullanabileceğimi,