# Asp.Net Core ile MongoDB Kullanımı

Amacım çok basit adımlarla bir .Net Core projesinde MongoDb'yi kullanabilmek. Örneği West-World(Ubuntu 18.04) üzerinde denedim.

## Ubuntu 18.04 MongoDb Kurulumu için Adımlar

```
sudo apt update
sudo apt install -y mongodb
```

mongodb servisinin çalışıp çalışmadığını kontrol et

```
sudo systemctl status mongodb
```

Güncel db versiyonunu şöyle bir kontrol et

```
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```

Servisi durdurmak için

```
sudo systemctl stop mongodb
```

Başlatmak için

```
sudo systemctl start mongodb
```

Restart etmek için

```
sudo systemctl restart mongodb
```

Disable veya Enable etmek için

```
sudo systemctl disable mongodb
```

```
sudo system enable mongodb
```

## Kurulum sonrası MONGO db'yi biraz kurcaladım

Terminalden mongoya ulaşmak için

```
mongo
```

örnek bir veritabanı oluşturmak için _(mesela Chinook isminde - bilenler bilir)_ Yoksa oluşturacak varsa ona geçecek.

```
use Chinook
```

Bir koleksiyon oluşturmak için

```
db.createCollection('Artists')
```

Koleksiyona örnek bir doküman eklemek için

```
db.Artists.insertOne(
   { title: "joe satriani", type: 'musician, guitar legend', tags: ["electro guitar","solo","legendry"] }
)
```

Eklediklerimizi aramak için

```
db.Artists.find( { title : "joe satriani" } )
```

Birden fazla dokümanı eklemek için

```
db.Artists.insertMany([
   { title: "jon bon jovi", type: 'musician,vocal', tags: ["classic rock","solo","legendry"] },
   { title: "U2", type: 'group', tags: ["classic rock","musicians","legendry"] },
   { title: "Pink Floyd", type: 'group', tags: ["rock","musicians","legendry","60s"] }
])
```

Bir dokümanı güncellemek için

```
db.Artists.update( 
    { title : "jon bon jovi" },
    { $set: { title : "Bon Jovi" } }
)
```

Darmadağan ettiğimiz Artists veritabanındaki tüm dokümanları silmek için

```
db.Artists.remove( { } )
```

Dokümanları filtreleyerek silmek için

```
db.Artists.remove( { title : "Bon Jovi" } )
```

## Asp.Net Core uygulamasının oluşturulması ve gerekli paketlerin yüklenmesi

```
dotnet new webapi -o KomancheApi
```

Mongo için gerekli NuGet paketleri

```
dotnet add package mongocsharpdriver
```

## Uygulamayı tamamladıktan sonra test için gerekli Request içerikleri

Örnek bir doküman eklemek için http://localhost:5004/api/artists adresine POST tipinden Content-Type değeri application/json olan bir içerik gönderilir. Mesela

```
{ "Title":"Bon Jovi","Tags" : "Music,Group"}
```

Tüm Artists dokümanlarını görmek için http://localhost:5004/api/artists şeklinde HTTP Get talebi göndermek yeterlidir.

Oluşturulan herhangi bir Artist dokümanına MongoDB'nin ürettiği ObjectId üzerinden erişebiliriz. Mesela http://localhost:5004/api/artists/5bfda8afc1893966e2fafe48 adresine HTTP Get talebi göndererek. Silme işleminde de aynı talebi HTTP Delete metodu ile göndermek yeterlidir.

Bir dokümanı güncellemek istersek yine http://localhost:5004/api/artists/5bfda8afc1893966e2fafe48 gibi bir adrese bu kez HTTP Put talebini, aynen Post örneğinde olduğu gibi application/json tipinden göndermek yeterli olacaktır.

```
{ "Title":"Jon Bon Jovi","Tags" : "Music,Group,Legendry"}
```
