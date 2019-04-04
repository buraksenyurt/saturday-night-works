# Hasura GraphQL Engine ile geliştirilmiş bir API Servisini Vue.js ile Kullanmak

API'ler için türlendirilmiş _(typed)_ sorgulama dillerinden birisi olarak öne çıkan GraphQL'e bir süredir uğramıyordum. Daha doğrusu GraphQL sorgusu çalıştırılabilecek şekilde API servis hazırlıklarını yapmaya üşeniyordum. Bu nedenle işi kolaylaştıran ve Heroku üzerinden sunulan Hasura GraphQL Engine hizmetine bakmaya karar verdim. Hasura, veriyi PostgreSQL kullanarak saklıyor ve ayrıca API'yi bir Docker Container içerisinden sunuyor. Amacım Hasura tarafında hazırlayacağım iki kobay veri setini, Vue.js tabanlı bir istemcisinden tüketmek. 

## Hasura GraphQL Engine Tarafının Geliştirilmesi

Pek tabii Heroku üzerinde bir hesabımızın olması gerekiyor. Sonrasında [şu](https://elements.heroku.com/) adrese gidip elements kısmından Hasura GraphQL Engine'i seçmek yeterli. 

![assets/credit_1.png](assets/credit_1.png)

Gelinen yerden _Deploy to Heroku_ diyerek projeyi oluşturabiliriz.

![assets/credit_2.png](assets/credit_2.png)

Ben aşağıdaki bilgileri kullanarak bir proje oluşturdum.

![assets/credit_3.png](assets/credit_3.png)

Deploy başarılı bir şekilde tamamlandıktan sonra 

![assets/credit_4.png](assets/credit_4.png)

_View_ seçeneği ile yönetim paneline geçebiliriz.

![assets/credit_5.png](assets/credit_5.png) 

Dikkat edileceği üzere GrapQL sorgularını çalıştırabileceğimiz hazır bir arayüz bulunuyor. Ancak öncesinde örnek veri setleri hazırlamalıyız. Bunun için Data sekmesinden yararlanabiliriz.

![assets/credit_6.png](assets/credit_6.png)

Arabirimin kullanımı oldukça kolay. Ben aşağıdaki özelliklere sahip tabloları oluşturdum.

![assets/credit_7.png](assets/credit_7.png)

categories isimli tablomuzda unique tipte, get_random_uuid() fonksiyonu ile eklenen satır için rastgele üretilen categoryId ve text tipinde title isimli alanlar bulunuyor. categoryId, aynı zamanda primary key tipinden bir alan.

![assets/credit_8.png](assets/credit_8.png)

products tablosunda da UUID tipinde productId, text tipinde description, number tipinde listPrice ve yine UUID tipinde categoryId isimli alanlar mevcut. categoryId alanını, ürünleri kategoriye bağlamak için _(foreign key relations)_ kullanıyoruz. Ama bu alanı foreign key yapmak için _Modify_ pencersine girmeliyiz.

![assets/credit_9.png](assets/credit_9.png)

![assets/credit_10.png](assets/credit_10.png)

İlişkinin geçerlilik kazanaması içinde, categories tablosunun _Relationships_ penceresine gidip önerilen bağlantıyı eklemek iyi olabilir.

![assets/credit_14.png](assets/credit_14.png)

![assets/credit_15.png](assets/credit_15.png)

![assets/credit_16.png](assets/credit_16.png)

>Bu durumda categories üzerinden products'a gidebiliyor olacağız. Ters ilişkiyi de kurabiliriz ve bir ürünle birlikte bağlı olduğu kategorinin bilgisini de yansıtabiliriz. Bunu deneyin.

Hasura'nın Postgresql tarafındaki örnek tablolarımız hazır. İstersek _Insert Row_ pencersinden tablolara örnek veri girişleri yapabilir ve GraphiQL pencresinden sorgular çalıştırabiliriz. Ben yaptığım denemelerle alakalı bir kaç örnek ekran görüntüsü paylaşayım.

![assets/credit_11.png](assets/credit_11.png)

![assets/credit_12.png](assets/credit_12.png)

### Örnek Sorgular

Kategoriler

```
query{
  categories{
    title
  }
}
```

![assets/credit_19.png](assets/credit_19.png)

Kategorilere bağlı ürünler

```
query{
  categories{
    title
    products{
      description
      listPrice
    }
  }
}
```

![assets/credit_18.png](assets/credit_18.png)

Ürünler tamamın ve bağlı olduğu kategori bilgileri

```
query{
  products{
    description
    listPrice
    category{
      title
    }
  }
}
```

![assets/credit_17.png](assets/credit_17.png)

Veri girişi de yapabiliriz. Bunun için mutation kullanıldığını daha önceden öğrenmiştim. Örneğin yeni bir kategoriyi aşağıdaki gibi ekleyebiliriz.

```
mutation {
  insert_categories(objects: [{
    title: "Çorap",
  }]) {
    returning {
      categoryId
    }
  }
```
![assets/credit_20.png](assets/credit_20.png)

## İstemci _(vue.js)_ Tarafı

>throw new NotImplementedException();

## Çalışma Zamanı

>throw new NotImplementedException();

## Neler Öğrendim

- Heroku'da Docker Container içerisinde çalışan ve PostgreSQL verileri GraphQL ile sorgulanabilir olarak sunan Hasura isimli bir motor olduğunu
- Hasura arabirimden ilişkili tabloları nasıl oluşturabileceğimi
- Bir kaç basit GraphQL sorgusunu

>throw new ToBeContinuedException();