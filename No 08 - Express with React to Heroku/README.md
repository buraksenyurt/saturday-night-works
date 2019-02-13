# Express, React ve Heroku

Bu örnekteki amacım node/Express servisi kullanan basit bir React uygulamasını Heroku üzerine deploy etmekti. express paketi bilindiği üzere HTTP yönlendiricisi olarak kullanılmakta. Gelen HTTP taleplerini karşılamamızda önemli bir yardımcı. React hiç tecrübe etmediğim bir alan. Bir nevi ona da merhaba demiş olacağım. [Heroku](https://www.heroku.com/) bir bulut bilişim platformudur.

## Ön hazırlıklar

Tabii öncelikle Heroku üzerinde bir hesap açmamız gerekiyor. Ben gerekli hesabı açtıktan sonra WestWorld'e _(Ubuntu 18.04, 64bit)_ heroku CLI kurulumunu da yaptım. Böylece heroku ile terminalden de iletişime geçebiliriz.

```
sudo snap install --classic heroku
```

Kurulum sonrası login olmamız da gerekiyor. 

```
heroku login -i
```

Yukarıdaki terminal komutunu çalıştırdıktan sonra credential bilgilerim soruldu. Email ve şifre. _(-i parametresini heroku login bilgilerinin kalıcı olması için kullanabiliriz)_

Ön hazırlıklar sonrası kodlamaya başlanabilir.

## Gerekli paketlerin yüklenmesi

Uygulamayı app isimli klasörde aşağıdaki terminal komutu ile inşa etmeye başlayabiliriz. 

```
npm init
```

Yardımcı paketleri yüklemek içinse şu terminal komutu ile ilerlemeliyiz.

```
npm i --save-dev express nodemon concurrently
```

express, servis tarafını kolay kullanabilmemiz için gerekli özellikleri sunan paket. nodemon ile de node.js tarafında yapılan değişikliklerin otomatik olarak algılanmasını sağlayacağız. Yani uygulamayı tekrar tekrar başlatmamıza gerek kalmadan değişikliklerimizi yapabileceğiz. concurrently paketini ise hem express hem react uygulamalarını aynı anda kolaca başlatabilmek için kullanacağız. 

## React hello world uygulamasının oluşturulması

React uygulamasını oluşturmak için aşağıdaki komutları ele alabiliriz.

```
npm i -g create-react-app
create-react-app fromwestworld
```

>Bu arada create-react-app komutu ile react uygulamasını oluştururken şunu fark ettim. Proje adında sadece küçük harf olmalı. Bir süre geçtikten sonra fromwestworld klasörü içerisinde React için gerekli ne varsa oluşturulduğunu gördüm. Aslında React için hazır olan bir şablon proje örneklendi. Oluşturulan bu template'i çok bozmadan kullanabiliriz. Nihayetinde elimizde bir node.js servisi ve hazır React uygulaması var. İlk adım olarak package.json içerisine bir proxy tanımı eklememiz gerekiyor. _(üşenme git bak)_

>Tahmin edileceği üzere express ile tanımlanan API'nin React içerisinden çağırılmasını anlamaya çalışıyorum. Bu nedenle şablonla gelen app.js içeriğinde çok az değişiklik yaptım.

## package.json'daki scripts kısmı

app klasöründe bulunan package.json dosyasındaki scripts kısmı önemli. Güncel hali aşağıdaki gibi.

```
"scripts": {
    "client-install": "npm install --prefix fromwestworld",
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm start --prefix fromwestworld",
    "dev": "concurrently \"npm run server\" \"npm run fromwestworld\"",
}
```
Bunlardan start haricindekiler _npm run_ arkasına eklenen komutlar aslında. Örneğin

```
npm start
```

ile 

```
node index.js
```

ve dolayısıyla uygulama çalıştırılmış oluyor.

Diğer yandan _npm run server_ ile nodemon'u devreye alırız ve kodda yapılan değişiklik anında çalışma zamanına yansıyor. _npm run client_ sunucuyu başlatmadan react uygulamasını çalıştırmakta. _npm run client-install_ sayesinde ise React uygulaması için gerekli tüm bağımlılıklar ilgili ortama _(örnekte Heroku olacaktır)_ yükleniyor. _npm run dev_ ile de development ortamı ayağa kalkmakta ve hem node sunucusu hem de react uygulaması aynı anda başlatılabilmektedir.

## Komple Çalıştırmak için

İlk olarak development ortamında çalıştırmak lazım. O nedenle app klasöründeyken

```
npm run dev
```

ile geliştiricinin üzerinde yoğun olarak çalışacağı ortamı ayağa kaldırabiliriz. Bu işlem sonrasında önce node sunucusu yüklenir. Sunucu çalışmaya başladıktan sonra React uygulaması tetiklenir ve localhost:3000 nolu porttan ilgili içeriğe ulaşılır.

>West-World'de uygulamanın açılması biraz zaman aldı. Sebat edip panik yapmadan beklemeniz gerekebilir.

![credit_1.png](./assets/credit_1.png)

![credit_2.png](./assets/credit_2.png)

## Geldik uygulamanın Heroku'ya alınmasına

Öncelikle Heroku üzerinde bir uygulama oluşturmak lazım.

```
heroku create
```

Bana proje adı olarak _frozen-hamlet-75426_ ismi geldi. Bunu Heroku otomatik olarak kendisi veriyor. Ayrıca uygulama kodlarını atabilmem için de github adresi ve uygulamaya ait web adreslerini iletti.

![credit_3.png](./assets/credit_3.png)

>Uygulamanın web adresi https://frozen-hamlet-75426.herokuapp.com/ şeklinde olacak. github adresi ise https://git.heroku.com/frozen-hamlet-75426.git

Hatta sonuçları Heroku Dashboard'unda da görebildim _(Tabii siz örneği denerken güncel hali Heroku üzerinde olmayabilir. Kendiniz için bir tane yapsanız daha iyi olur)_

![credit_4.png](./assets/credit_4.png)

>Uygulama klasöründeki json dosyasında yer alan heroku-postbuild script'i önemli.

Sonrasında iş git ile yapılacak iş birliğinde.

```
heroku git:remote -a frozen-hamlet-75426
git add .
git commit -am 'Heroku React Express örneği eklendi'
git push heroku master
```

Yani kısaca

- Heroku için git remote adresini belirle
- Tüm değişiklikleri stage'e al
- Bunları commit'le
- Sonrada master branch'e push'la

Sonrasında yapmam gereken tek şey https://frozen-hamlet-75426.herokuapp.com/ adresine gitmek oldu.

![credit_5.png](./assets/credit_5.png)

## Yaptığım Hatalar

Uygulamayı tek seferde Heroku'ya alamadım. Sorunları görmek için terminalden

```
heroku logs --tail
```

komutunu kullandım. Buradan edindiğim bilgilere göre sorunları çözdüm.

- İlk hatam server.js dosyasında process.env.PORT yerine process.env.port kullanmış olmamdı. Heroku ortamı bu port'u anlamadığı için 5005 nolu porttan yayın yapmaya çalıştı ki bu mümkün değildi.
- İkinci hatam package.json içerisinde ortam için gerekli node engine versiyonunu söylememiş olmamdı.
- Diğer problemse bağımlı olunan npm paketleri için package.json'dan dependencies yerine devDependencies sektörünü bırakmamdı.
- Ayrıca .gitignore koymayıp node_modules ve package-log.json'ları hariç tutmadığım için bu klasörleri de komple push'lamış oldum _Sonraki versiyonda düzelttim tabii_

## Neler Öğrendim?

- Heroku'da nasıl hesap açacağımı,
- Heroku'yu Ubuntu'da nasıl kullanabileceğimi,
- Node.js sunucusundan bir React uygulamasını nasıl ayağa kaldırabileceğimi,
- Bir React uygulamasının nasıl oluşturulabildiğini,
- Heroku CLI ile uygulamanın nasıl deploy edildiğini,
- Deployment sırasındaki veya çalışma zamanındaki hatalara ait loglara nasıl bakabileceğimi ve onları nasıl yorumlayabileceğimi,