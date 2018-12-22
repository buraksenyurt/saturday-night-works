# Angular ile Basit Bir ToDo Uygulaması Yazmak

Amacım Angular için basit bir Hello World uygulaması oluşturmak.

>Platform olarak West-World _(Ubuntu 18.04)_ üzerinde çalıştım.

## Ön Gereklilikler

Makinede node ve npm yüklü durumda. Ayrıca Angular için Command Line Interface(CLI) aracına ihtiyaç var. Kurmak için gerekli terminal komutu;

```
sudo npm install -g @angular/cli
```

Ayrıca önyüz tarafında Bootstrap kullanılmıştır.

```
bower i bootstrap
```

>Ben bootstrap'i indirdikten sonra gerekli css dosyalarını assets/css altına alıp oradan kullandırttım. _(index.html sayfasına bakın)_

## Uygulamayı Oluşturmak

Angular uygulamasını hazır şablonundan üretmek oldukça kolay.

```
ng new life-pbi-app
```

# Nerelerde değişiklik yaptım