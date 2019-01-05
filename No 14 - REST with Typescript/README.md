# Typescript Kullanarak Bir Web API Geliştirmek

Amacım FortJs isimli projeyi kullanarak, Typescript ile bir Web API servisi geliştirebilmek. FortJs, MVC tabanlı bir web framework. Nodejs için geliştirilmiş ve Typescript desteği sunmakta. Bende bu tarafını kurcalamak istedim.

## Kurulumlar

İlk olarak https://github.com/ujjwalguptaofficial/fortjs-typescript-starter adresinden bir projeyi klonlamam gerekti. Sonrasında WestWorld için gerekli eksik npm paketlerinin yüklemesini yaptım. Sonra node uygulamasını başlattım ve localhost:4000 adresine gittim. Varsayılan FortJs sayfası ile karşılaştım.

```
git clone https://github.com/ujjwalguptaofficial/fortjs-typescript-starter
cd fortjs-typescript-starter
npm install
npm run start
```

![cover_1.png](cover_1.png)

QuoteController isimli ilk controller bileşenini ekledikten sonra http://localhost:4000/quote adresine gittiğimde aşağıdaki çıktıyı elde ettim.

![cover_2.png](cover_2.png)

## Yapılan Değişiklikler

- controllers klasörüne quote_controller.ts eklendi
- routes.ts dosyasında eklenen controller bildirimi yapıldı
- models klasörü oluşturulup içersine quote.ts isimli model sınıfı eklendi
- services klasörü oluşturulup içersine quote_service.ts dosyası eklendi

## Neler Öğrendim