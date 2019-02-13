# Flask-RESTPlus ile REST Api Geliştirmek

Python galaksisinde, Resource bazında büyüyen ve versiyonlamaların artması sonrası karmaşıklaşan REST Api'ler için bir standart olması açısından Flask Blueprints yaklaşımı uygulanıyor. RESTPlus bu standardı daha kolay uygulayabilmek için gerekli kuralları bünyesinde barındırmakta. Otomatik dokümantasyon hazırlama, request/response validation, RESTful API'ler için minimum kurulum gereksinimi ve benzeri gereksinimlerin kolayca hazırlanmasında kullanılıyor. Amacım Flask'in bir uzantısı olan Flask-RESTPlus'ın basit anlamda nasıl uygulanabileceğini incelemek.

>Örneği her zaman olduğu gibi WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde çalıştım.

## Gereksinimler

Sistemde python ve pip _(python paket yöneticisi)_ yüklü olmalı. Temel seviyede Python ve RESTful servis bilgisi de örneği geliştirirken işimizi kolaylaştırır. Bunlar başlangıç için yeterli. Flask-RestPlus paketini projemizde kullanabilmek için

```
pip install Flask-RestPlus
```

terminal komutu ile yüklememiz gerekiyor.

## Örnekler

Çalışma sırasında bir kaç örnek üzerinden ilerlenilmiştir.classic-api.py klasik olarak Flask ile geliştirilmiş bir REST API'dir. Buna ek olarak 3 program kodu daha geliştirilmiştir.

## Örnekleri Çalıştırmak

için terminalden 

```
python [dosyaAdi.py]
```

komutunu işletmek yeterlidir. Sonrasında tarayıcıdan ilgili adreslere giderek API çağrıları gerçekleştirilebilir. Talepler icin curl aracından da yararlanılabilir. Örneğin,

```
curl -d '{"id":9034,"name":"Modem"}' -H "Content-Type: application/json" -X POST http://localhost:4446/categories
```

ile servise bir POST talebi gönderilmektedir. Body kısmında basit bir JSON içeriği bulunuyor. Yeni bir kategorinin eklenmesini bu şekilde test edebiliriz. 

### 1nci Örneği Çalışırken (classic_api.py)

Aşağıdaki curl komutlarını kullanarak testlerimi gerçekleştirdim.

```
curl http://localhost:4446/categories/

curl http://localhost:4446/categories/1

curl -d '{"id":9034,"name":"Modem","count":8}' -H "Content-Type: application/json" -X POST http://localhost:4446/categories

curl -d '{"id":-1,"name":"Book","count":35}' -H "Content-Type: application/json" -X PUT http://localhost:4446/categories/1
```

### 2nci Örneği Çalışırken (restplus_1.py)

rest-plus'ın hazır gelen davranışlarından birisi de Swagger dokümantasyonunu otomatik olarak hazırlaması. _http://localhost:4446/_ adresine ikinci örnek için gidildiğinde bunu görebiliriz.

![credit_1.png](credit_1.png)

İkinci örnekte kullandığım curl komutları ise şöyle;

```
curl -d '{"id":1,"name":"USB Cable","count":7}' -H "Content-Type: application/json" -X POST http://localhost:4446/categories

curl -d '{"id":2,"name":"LCD 17inch monitor","count":10}' -H "Content-Type: application/json" -X POST http://localhost:4446/categories

curl http://localhost:4446/categories

curl http://localhost:4446/categories/1

curl -d '{"name":"LCD 15inch monitor","count":20}' -H "Content-Type: application/json" -X PUT http://localhost:4446/categories/2

curl -X DELETE http://localhost:4446/categories/2

curl http://localhost:4446/categories

```

Ama bunları kullanmak şart değil. Pekala Swagger arayüzü de kullanılabilir. 

>POST için gerekli olan payload model bildirimi sonrası Swagger Try Out kısmı aşağıdaki gibi olur.

![credit_2.png](credit_2.png)

### 3ncü Örneği Çalışırken (restplus_2.py)

Bu sefer hem basit bir DAO _(Data Access Object)_ nesnesi hemde namespace kullanımını örnekliyoruz. Namespace'leri birbirleri ile ilişkili kaynakları _(Resource)_ ortak bir alanda gruplamak için kullanmaktayız. Buna göre ikinci örnekteki route tanımlamalarında yer alan categories ifadelerini _(iki Resource'ta geçiyor ama gerçek bir projede bu şekilde n sayıda Resource olabilir)_ en başta bir namespace şeklinde belirtiyoruz. _(iki örnekteki route kullanımlarını karşılaştırınca anlaşılıyor)_ DAO işlemlerini üstlenen CategoryDAO isimli ayrı bir pyhton dosyasında duruyor. En azından temel CRUD operasyonlarının sorumluluğunu ayrıştırmış oluyoruz.

>Bu örnekte testleri tamamen Swagger arayüzü üzerinden icra edebiliriz.

### 4ncü Örneği Çalışırken (restplus_3.py)

Bu basit servis şu an için 5 API operasyonu sunuyor. Ancak canlı ortamlarda bu sayı giderek artabilir. Resource sayıları fazlalaştığında çok doğal olarak yönetim de zorlaşacaktır. En başından itibaren versiyonlamak iyi bir stratejidir. Flesk Blueprints bu tip ihtiyaçları karşılayan bir tasarım modeli tanımlar. 4ncü örnekte çok fazla kod müdahalesi yapmadan versiyon desteği sunmaktayız _(Bu örnek Blueprint tasarımının çok ilkel bir halini içeriyor)_

Tabii URL adresimiz aşağıdaki gibi değişmiş durumda.

http://localhost:4446/api/v1/docs 

![credit_3.png](credit_3.png)

Birden fazla versiyonun ve n sayıda Resource'un kullanıldığı senaryolarda klasör yapısını da doğru uygulamak gerekmekte. Mesela aşağıdaki gibi bir ağaç yapısı kurgulanabilir.

```
proje/
|----- app.py
|----- api_v1.py
|----- api_v2.py
|_____ apis/
        |----- __init__.py
        |----- namespace1.py
        |----- namespace2.py
        |----- ...
```

## Yapılması Gerekenler

- JSON Schema Validation
- Nesne koleksiyonu olarak bir DB seçilmesi ve kullanılması _(mongodb olur postgresql olur vs)_
- İkinci bir resource'un daha eklenmesi _(Product gibi)_
- Blueprint konusunun daha detaylı araştırılması 

## Ne Öğrendim?

- Flask ile klasik bir REST servisinin geliştirilmesini
- jsonify' ın ne işe yaradığını
- API içinde sınıfları Resource olarak ele almayı
- Rest-Plus'ın basit uygulanışını
- api.doc ve api.expect'in Swagger üzerindeki etkilerini
- Veri operasyonları için bir DAO sınıfını nasıl kullanılabileceğini
- namespace kavramını
- CURL aracı ile komut satırından HTTP talepleri göndermeyi
- Blueprint tasarım modeline göre versiyonlamanın nasıl yapılabileceğini