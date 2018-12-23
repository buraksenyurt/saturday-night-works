# Webpack ile basit bir vue.js uygulaması geliştirmek

Amacım Single-File Components kavramını anlamak ve Webpack'ten yararlanarak bir Vue.js uygulaması yazıp onu paketlemek.

>Platform olarak West-World _(Ubuntu 18.04)_ üzerinde çalıştım.

## Ön Gereklilikler

İşe proje iskeletini oluşturarak başladım.

```
mkdir cometovue
cd cometovue
npm init
mkdir src

```

Sonrasında aşağıdaki ilaveleri yaptım.

![credit_1.png](credit_1.png)

Projenin diğer bağımlılıklarını yüklemek içinse npm aracından yararlandım. _(Epey bir bağımlılık yüklemem gerekti)_

```
npm install vue vue-loader vue-template-compiler webpack webpack-cli webpack-dev-server babel-loader @babel/core babel-preset-env css-loader vue-style-loader html-webpack-plugin rimraf -D
```

- rimraf sıkça build edilmiş eski dosyaları silme ihtiyacı için kullanılıyor
- webpack kodları bazı dönüşümlerle tek bir dosya içerisine paketlemek için
- webpack-cli, webpack komutlarını çalıştırmak için
- babel-loader, ES6 kodlarını ES5'e dönüştürmek için
- css-loader, CSS dosyalarının nerede olduğunu anlayıp yüklemeyi kolaylaştırdığı için
- vue-css-loader, css-loader'dan alınan css'i HTML içerisine enjekte etmek için
- html-webpack-plugin, index.html'in başına paketlenmiş Javascript dosyasını enjekte edip dosyayı bu haliyle dist klasörüne attığı için
- vue, elbetteki javascript framework'ümüz olduğu için
- vue-loader, vue dosyalarını javascript'e dönüştürmek için _(vue-template-compiler' da benzer görevi üstleniyor)_

## Çalışma zamanı

## Neler Öğrendim?

- 

öğrendim