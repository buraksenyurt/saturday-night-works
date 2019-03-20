# Azure SignalR Servisini Kullanmak

Amacım Azure platformundan sunulan SignalR hizmetini kullanarak abone olmuş istemcilere bildirimde bulunabilmek. Normal SignalR senaryosundan farklı olarak, istemciler ve tetikleyici arasındaki eş zamanlı iletişimi _(Real Time Communications)_ Azure platformundaki bir SignalR servisi ile gerçekleştirmeye çalışacağım. Senaryomuzda bildirimleri gören web tabanlı bir istemci, local ortamda çalışan ve bildirim yayan bir Azure Function ve Azure platformunda konuşlandırılan bir SignalR servisi bulunuyor. Azure üzerinde koşan SignalR servisi Serverless modda çalışacak şekilde ayarlanacak. 

SignalR servisi tüm Azure fonskiyonları ile kullanılabilir. Örneğin Azure Cosmos DB'deki değişiklikleri SignalR servisi ile istemcilere bildirebiliriz, benzer şeyi kuyruk mesajlarını veya HTTP taleplerini işleyen Azure Fonksiyonları için de sağlayabiliriz. Kısacası Azure fonksiyonlarından yapılan tetiklemeler ile SignalR abonelerini bilgilendirebiliriz.

## Ön Gereksinimler

Azure platformunda SignalR servisini oluşturmadan önce WestWorld _(Ubuntu 18.04, 64bit)_ tarafında Azure Function geliştirebilmek için gerekli kurulumları yapmam gerekiyor. İlk olarak Azure Functions Core Tools'un yüklenmesi lazım. Aşağıdaki terminal komutları ile bunu gerçekleştirdim. Önce Microsoft ürün anahtarını kayıt ettik, sonrasında bir güncelleme yapıp nihayetinde azure-functions-core-tools paketini yüklettik.

```
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg

sudo apt-get update

sudo apt-get install azure-functions-core-tools
```

Kurulumdan sonra terminalden Azure Function projeleri oluşturmaya başlayabiliriz. Lakin bu işin Visual Studio Code tarafında daha kolay bir yolu var. Azure Functions isimli extension'ı kullanmak.

![assets/credit_1.png](assets/credit_1.png)

Sonrasında Visual Studio Code'a gelen yeni araçla kolayca Azure Function projeleri oluşturabiliriz. 

## Azure SignalR Servisinin Hazırlanması

Ama öncesinde Azure'da bir SignalR servisi oluşturmam gerekiyor. [Azure Portal](https://portal.azure.com) adresinden SignalR Service öğesini aratarak işe başladım.

![assets/credit_2.png](assets/credit_2.png)

Free Tier planında, learning-rg Resource Group altında basketcini.service.signalr.net isimli bir SignalR servisi oluşturdum. SignalR servisinin oluşması biraz zaman aldı. Servis etkinleştikten sonra ise özelliklerine giderek Serverless modda çalışacak şekilde ayarladım.

![assets/credit_3.png](assets/credit_3.png)

Oluşan SignalR servisi ile local makinede çalışacak ve tetikleyici görevini üstlenecek Azure Functions'ın haberleşebilmesi için, Key değerlerine de ihtiyacım olacak. Bu değerleri Azure Function uygulamasının local.settings.json dosyasında kullanacağız.

![assets/credit_4.png](assets/credit_4.png)

## Azure Functions Projesinin Oluşturulması

Yüklenen Azure Functions aracından 'Create New Project' seçimini yaptım. Proje için bir klasör belirledim _(Ben NotifierApp isimli klasörü kullandım)_ Dil olarak C#'ı tercih ettim. Sonrasında 'Create Function' seçeneği ile projeye Scorer isimli bir fonksiyon ekledim. Bu ekleme işlemi sırasında sorulan sorulara aşağıdaki cevapları vererek ilerledim. HTTP metodları ile tetiklenen bir fonksiyon söz konusu. 

```
Fonksiyon Adı   :       Scorer
Klasör          :       NotifierApp
Tipi            :       Http Trigger
Namespace       :       Basketcini.Function
Erişim Yetkisi  :       Anonymous
```

### Azure Functions Projesinde Yapılanlar

>throw NotImplementedException();

## İstemci Uygulama Tarafı

>throw NotImplementedException();

## Çalışma Zamanı

>throw NotImplementedException();

## Neler Öğrendim

>throw NotImplementedException();