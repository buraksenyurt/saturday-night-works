# Asp.Net Core ile MongoDB Kullanımı

Amacım çok basit adımlarla bir .Net Core projesinde popüler NoSQL veritabanı sistemlerinden olan MongoDb'yi kullanabilmek. Örneği WestWorld _(Ubuntu 18.04 64it)_ üzerinde denedim.

## Ubuntu 18.04 MongoDb Kurulumu için Adımlar

Ubuntu tarafında MongoDB kurulumu için aşağıdaki adımlar takip edilebilir.

```
sudo apt update
sudo apt install -y mongodb
```

Kurulum başarılı bir şekilde tamamlandıysa mongodb servisinin çalışıp çalışmadığını kontrol etmekte yarar var.

```
sudo systemctl status mongodb
```

Güncel db versiyonunu da aşağıdaki terminal komutu ile kontrol edebiliriz.

```
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```

Her zaman arka planda MongoDb servisinin çalışmasına gerek yok. Servisi durdurmak için,

```
sudo systemctl stop mongodb
```

Başlatmak için,

```
sudo systemctl start mongodb
```

Restart etmek için,

```
sudo systemctl restart mongodb
```

Disable veya Enable etmek için,

```
sudo systemctl disable mongodb
```

```
sudo system enable mongodb
```

komutlarından yararlanabiliriz.

## Kurulum sonrası MONGO db'yi biraz kurcaladım

Terminalden mongo ortamına ulaşmak için şu terminal komutu yeterli olacaktır.

```
mongo
```

Örnek bir veritabanı oluşturmak için _(mesela Chinook isminde - bilenler bilir)_ aşağıdaki komut kullanılabilir. Eğer sistemde Chinook isimli bir veritabanı yoksa oluşturulur varsa onun üzerinde çalışacak şekilde ortam ayarlanır.

```
use Chinook
```

MongoDB koleksiyonlarla çalışır. Bir koleksiyon oluşturmak için createCollection fonksiyonundan yararlanılır.

```
db.createCollection('Artists')
```

Koleksiyonlar içerisinde dokümanlar yer alır ve JSON formatında veri saklarlar. Koleksiyona örnek bir doküman eklemek için insertOne metodu kullanılabilir.

```
db.Artists.insertOne(
   { title: "joe satriani", type: 'musician, guitar legend', tags: ["electro guitar","solo","legendry"] }
)
```

Eklediğimiz dokümanlarda arama yapmak için yine JSON formatında sorgular kullanabiliriz. find metodu işe yarayacaktır.

```
db.Artists.find( { title : "joe satriani" } )
```

Pek tabii bazı hallerde birden fazla doküman eklemek gerekebilir. insertMany n sayıda doküman içeriğini JSON formatında alabilir. Örnek kullanımı aşağıdaki gibidir.

```
db.Artists.insertMany([
   { title: "jon bon jovi", type: 'musician,vocal', tags: ["classic rock","solo","legendry"] },
   { title: "U2", type: 'group', tags: ["classic rock","musicians","legendry"] },
   { title: "Pink Floyd", type: 'group', tags: ["rock","musicians","legendry","60s"] }
])
```

Bir dokümanı güncellemek için update fonksiyonundan yararlanırız. $set ile başlayan kısım ilgili alanın güncellenecek verisini tutar.

```
db.Artists.update( 
    { title : "jon bon jovi" },
    { $set: { title : "Bon Jovi" } }
)
```

Darmadağan ettiğimiz Artists veritabanındaki tüm dokümanları silmek istersek boş JSON içeren bir remove çağrısı yaramıza merhem olacaktır.

```
db.Artists.remove( { } )
```

Dokümanların tamamına kıymak istemeyip filtreleyerek silmek istersek remove fonksiyonuna JSON formatında kriter vermemiz uygun olur.

```
db.Artists.remove( { title : "Bon Jovi" } )
```

## Asp.Net Core uygulamasının oluşturulması ve gerekli paketlerin yüklenmesi

Örneğin anlamlı hale gelmesi için MongoDB'yi bir Asp.Net Core uygulamasında deneyimlemek istedim. Web API ortamında bu işi deneyimlemek benim için daha kolaydı. webapi uygulamasını oluşturduktan sonra,

```
dotnet new webapi -o KomancheApi
```

Mongo için gerekli NuGet paketini de aşağıdaki terminal komutu ile projeye dahil ettim.

```
dotnet add package mongocsharpdriver
```

## Uygulamayı tamamladıktan sonra test için gerekli Request içerikleri

Örnek bir doküman eklemek için http://localhost:5004/api/artists adresine POST tipinden Content-Type değeri application/json olan bir içerik gönderilir. Mesela,

```
{ "Title":"Bon Jovi","Tags" : "Music,Group"}
```

Tüm Artists dokümanlarını görmek için http://localhost:5004/api/artists şeklinde HTTP Get talebi göndermek yeterlidir.

Oluşturulan herhangi bir Artist dokümanına MongoDB'nin ürettiği ObjectId üzerinden erişebiliriz. Mesela http://localhost:5004/api/artists/5bfda8afc1893966e2fafe48 adresine HTTP Get talebi göndererek. Silme işleminde de aynı talebi HTTP Delete metodu ile göndermek yeterlidir.

Bir dokümanı güncellemek istersek yine http://localhost:5004/api/artists/5bfda8afc1893966e2fafe48 gibi bir adrese bu kez HTTP Put talebini, aynen Post örneğinde olduğu gibi application/json tipinde göndermek yeterlidir.

```
{ "Title":"Jon Bon Jovi","Tags" : "Music,Group,Legendry"}
```
## Neler Öğrendim?

- MongoDb'yi Ubuntu'ya nasıl kuracağımı
- Terminalden mongodb ile nasıl anlaşabileceğimi
- .Net core tarafında mongocsharpdriver'dan nasıl yararlanıldığını