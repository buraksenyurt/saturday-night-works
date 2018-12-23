# Angular ile Basit Bir Görevle Listesi Uygulaması Yazmak

Amacım Angular için basit bir Hello World uygulaması oluşturmak.

>Platform olarak West-World _(Ubuntu 18.04)_ üzerinde çalıştım.

Uygulamayı çalıştırmak için

```
ng server
```

komutunu vermek ve http://localhost:4200 adresine gitmek yeterli.

## Ön Gereklilikler

Makinede node ve npm yüklü durumda. Ayrıca Angular için Command Line Interface(CLI) aracına ihtiyaç var. Kurmak için gerekli terminal komutu;

```
sudo npm install -g @angular/cli
```

Ayrıca önyüz tarafında Bootstrap kullanılmıştır.

```
bower i bootstrap
```

>Ben bootstrap'i indirdikten sonra gerekli css dosyalarını assets/css altına alıp orayı referans göstermeyi tercih ettim. _(index.html sayfasına bakın)_

## Angular Uygulamasını Oluşturmak

Angular uygulamasını hazır şablonundan üretmek oldukça kolay.

```
ng new life-pbi-app
```

## Nerelerde değişiklik yaptım

ng new sonrası oluşan proje içerisinde çok fazla dosya var. Örneği sonradan bakınca anlayabilmek için sadece değişiklik yaptığım dosyaları aşağıdaki listeye ekledim.

- index.html
- app.component.html
- app.component.ts

## Çalışma zamanı

![credit_1.png](credit_1.png)

## Neler Öğrendim?

- Typescript ile HTML tarafındaki Angular yapılarının nasıl anlaştığını,
- Bootstrap'i bir Angular projesinde nasıl kullanabileceğimi,

öğrendim