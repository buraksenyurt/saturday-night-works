# Apollo Server ile Bir GraphQL Sunucusu Yazmak

Apollo Server, web, mobile gibi istemciler için GraphQL servisi sunan bir ürün olarak düşünülebilir. Otomatik API doküman desteği sunar ve herhangibir veri kaynağını kullanabilir. Yani bir veri tabanını veya bir mikroservisi ya da bir REST APIyi, GraphQL hizmeti verebilecek şekilde istemcilere açabilir. Tek başına sunucu gibi çalıştırılabileceğinden de ilgimi çekti aslında. Pek tabii Heroku gibi ortamlarca Serverless olarak da kullanılabiliyor. Kabaca aşağıdaki şekli göz önüne alabiliriz.

![assets/credit_1.png](assets/credit_1.png)

İstemciler kendilerine uygun Apollo Client paketlerini kullanarak sunucu tarafı ile kolayca haberleşebilirler. 

Benim amacım stand alone çalışan bir Apollo sunucusu yazmak ve arka tarafta bir veri tabanını kullanarak veriyi GraphQL üzerinden istemcilere açmak.

## Başlangıç ve İlk Kurulumlar

Proje iskeletini aşağıdaki gibi oluşturabilir ve Node.js tarafı için gerekli paketleri yükleyebiliriz.

>Örneği her zaman olduğu gibi WestWorld _(Ubuntu 18.04, 64bit)_ üzerinde deniyorum.

```
mkdir project-server
cd project-server
npm init
npm install apollo-server graphql
touch server.js
```

## Birinci Sürüm

İlk sürümde veriyi bir diziyle besledim. Temel amaç Apollo Server'ın meziyetlerini ortaya koymaktı. 

- server.js içeriği yazıldı _(kod dosyasındaki açıklamalardan yardım alabilirsiniz)_

Her iki sürümü çalıştırmak için terminalden 

```
npm run serve
```

yazmak yeterli. _(Tahmin edileceği üzere package.json içerisine eklediğimiz bir run komutu var)_ Bunun sonucu olarak http://localhost:4444 adresine gidebilir ve otomatik olarak açılan Playground arabirimi üzerinden denemelerimizi yapabiliriz. 

Array kullanan bu ilk sürümün çalışma zamanına ait bir kaç ekran görüntüsüyse şöyle.

```
# Yeni bir görev eklemek
mutation {
  Insert(
    payload: {
      id: 1
      title: "Günde 50 mekik"
      description: "Kocaman göbüşün oldu. Her gün düzenli olarak mekik çekmelisin."
      size: "S"
    }
  ) {
    id
    title
    description
    size
  }
}
```

![assets/credit_2.png](assets/credit_2.png)

```
# Tüm görevlerin listesi
{
  AllTasks {
    title
    description
    size
    id
  }
}
```

![assets/credit_3.png](assets/credit_3.png)

```
# Var olan bir satırı güncelleme
mutation {
  Update(
    payload: {
      id: 1
      title: "100 Mekik"
      description: "Göbek eritme operasyonu"
      size: "M"
    }
  ) {
    id
    title
    description
    size
  }
}
```

![assets/credit_4.png](assets/credit_4.png)

```
# Id değerine göre görev silinmesi
mutation {
  Delete(id: 1) {
    DeletedId
    Result
  }
}
```

![assets/credit_5.png](assets/credit_5.png)

İlk sürüm önceden de belirttiğimiz üzere Apollo Server'ı basitçe işin içerisine katmak ve nasıl çalıştığını anlamak içindi. Array kullanıldığında uygulama sonlandırıldığında tüm içerik kaybolacaktır. Kalıcı bir depolama alanı için farklı bir alternatif düşünmeliyiz. CRUD operasyonlarını başka bir servise atayabilir veya bir veri tabanı kullanabiliriz.

## İKinci Sürüm

İkinci sürümde amaç veri kaynağı olarak PostgreSQL kullanmak.

>throw new NotImplementedException("WestWorld üzerinde PostgreSQL yok gibi?");

>throw new NotImplementedException("PostgreSQL in Mutation içerisindeki kodlamaları eksik");

## Neler Öğrendim

- GraphQL'de tip tanımlaması _(type definitions)_ ve çözücülerin _(resolvers)_ ne anlama geldiğini ve neler barındırdığını
- Apollo Server kullanımını
- Insert, Update, Delete gibi operasyonları Mutation terimi içerisinde ele alındığını
- CRUD operasyonlarına ait iş mekaniklerinin resolvers içindeki Query ve Mutation segmentlerinde yürütüldüğünü
- Veri kaynağı olarak farklı ortamların kullanılabileceğini _(micro service, NoSQL, RDBMS, File System, REST API)_
- Int? ile Int tiplerinin yerine göre doğru kullanılmaları gerektiğini _(bir kaç çalışma zamanı hatası sonrası fark ettim)_

>throw new ToBeContinuedException();