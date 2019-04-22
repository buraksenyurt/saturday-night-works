# Bir Python Uygulamasını git Tekniği ile Azure Platformuna Taşımak

Çok sık kullanılan Azure öğretilerinden birisi bu. Amaç git yardımıyla Azure üzerinde deployment işlemi başlatmak. Ben bunu python ile denemek istedim. Bu sefer işim biraz daha zorlu. Nitekim WestWorld _(Ubuntu 18.04, 64bit)_ topraklarını bir süreliğine terk ettim. Artık ahch-to _(Mac Mini, High Sierra)_ adasındayım. Bu nedenle sistemde bazı şeyler eksik gibi görünüyor.

## Ön Gereksinimler ve Kurulumlar

Örnek python flask paketini kullanan basit bir web uygulaması. ahch-to sisteminde python'un 2.7 sürümü mevcut lakin ben 3 üzeri bir versiyon kullanmak istiyorum. Bu nedenle homebrew'den yararlanarak yeni bir kurulum gerçekleştirdim. _(Tabii homebrew de sistemde yoktu. Nasıl kurulduğunun araştırmasını size bırakıyorum)_

```
brew update
brew install python
```

### Azure CLI Kurulumu

Azure tarafındaki işlemler için CLI aracından yararlanacağım. Onu kurmak için ilk terminal komutunu kullandım. İkinci komutla da azure'a login oldum.

```
brew install azure-cli
az login
```

![assets/credit_1.png](assets/credit_1.png)

### Azure Deployment Hazırlıkları

Uygulamayı Azure tarafına deploy edebilmek için yapılması gerekenler var. Sırasıyla _deployment user_, _resource group_ ,  _service plan_ ve son olarak _web app_ oluşturmalıyız. Bunlar için aşağıdaki terminal komutlarını kullanarak ilerledim.

```
as webapp deployment user set --user-name dpyl-usr-buraks --password <azure kurallarına uyan bir şifre>

az group create --name rg-todoshero --location westeurope

az appservice plan create --name plan-todoshero --resource-group rg-todoshero --sku B1 --is-linux

az webapp create --resource-group rg-todoshero --plan plan-todoshero --name todosherowebapp --runtime "PYTHON|3.7" --deployment-local-git
```

İlk satırda dply-usr-buraks isimli bir kullanıcı tanımlıyoruz. Deployment işlemlerini bu kullanıcı ele alacak. İkinci satırda veri tabanı, servis planlaması, kurulumu yapılacak uygulamalar gibi bu işimizle ilgili kaynakları grupladığımız bir tanımlama yapıyoruz. _(Örneğin Resource Group'u sildiğimizde bu grup altında hazırladığımız ne kadar Azure enstrümanı varsa silinecektir)_ İşimizle ilgili kaynakları tek noktadan yönetmek için açtığımızı düşünebiliriz. Üçüncü komutta bir servis planı oluşturmaktayız. Burada basic ödeme şartlarına göre oluşturulan ve linux tabanlı docker container'ı kullanılan bir plan söz konusu. Son terminal komutu ile todosherowebapp isimli bir web uygulaması oluşturuyoruz. Biraz önce oluşturlan servis planına göre hazırlanacak ve Python 3.7 sürümü ile çalışacak. Sonda yer alan --deployment-local-git parametresi ile dağıtım planımızı da _(git ile yapacağımızı)_ söylemiş oluyoruz.  

Terminalden çalıştırdığım komutlar başarılı olunca aşağıdaki sonuçla karşılaştım.

![assets/credit_3.png](assets/credit_3.png)

Uygulamanın web adresi todosherowebapp.azurewebsites.net şeklinde oluşturulurken, github repository adresi de https://dply-usr-buraks@todosherowebapp.scm.azurewebsites.net/todosherowebapp.git şeklinde oluştu.

![assets/credit_4.png](assets/credit_4.png)

## Uygulamada Yapılanlar

Klasör ve dosya ağacı aşağıdaki gibidir.

```
cd src
mkdir todayshero
touch todayshero/app.py
touch todayshero/requirements.txt
touch todayshero/.gitignore
```

>requirements.txt, Azure platformunun Python ortamlı deploy işlemi için kullanacağı bir doküman. Bu dosya içerisine yazılan paketler, azure deploy işlemi sırasında pip ile uzak sunucu ortamına yüklenmeye çalışılır.

Tabii ahch-to üzerindeki denemeler için flask paketini öncelikle geliştirme ortamına yüklemem gerekiyordu. 

```
pip3 install flask
```

## Çalışma Zamanı _(Local ortamda)_ 

Bu işlemin ardından web uygulamasını önce local ortamda çalıştırmayı denedim.

```
FLASK_APP=app.py flask run
```

![assets/credit_2.png](assets/credit_2.png)

Bu basit uygulama kodu list içeriğinden seçtiği rastgele bir karakterin adını ekrana yazdırmakla görevli. _(git ve azure ikilisinin bir arada kullanılması üzerine yoğunlaştığımız için mümkün mertebe basit bir örnek kullanıyoruz)_

## Çalışma Zamanı _(Git Deploy)_

Uygulamayı local ortamdan git aracılığıyla Azure'a almak içinse aşağıdaki adımları izledim. _(todoshero klasörü altında)_

```
git init
git remote add azure https://dply-usr-buraks@todosherowebapp.scm.azurewebsites.net/todosherowebapp.git
git add .
git commit -m "Application has been added"
git push azure master
```

Standart git komutları ile uygulamayı azure reposuna deploy ettik. İlk olarak initialize işlemi var. Sonra uzak repo adresini ekliyoruz. Tüm kod dosyalarını . ile alıp commit ettikten sonra push çağrısı ile değişikliklerimizi yolluyoruz. 

push işlemini takiben azure sitesine tekrar gittiğimde python uygulamasının etkinleştiğini gördüm.

![assets/credit_5.png](assets/credit_5.png)

Hatta Azure portaline baktığımda hem oluşturulan resource group içeriğini hem de yaptığım son push işlemlerini görebildim.

![assets/credit_6.png](assets/credit_6.png)

![assets/credit_7.png](assets/credit_7.png)

## TODO

- Farklı uygulama geliştirme ortamları için _(ruby, .net core, node.js vb)_ aynı kurguyu gerçekleştirmeyi deneyebilirsiniz.

## Neler Öğrendim

- brew ile macOS platformuna paket yüklemeyi
- azure CLI ile deployment user, resource group, service plan ve web app oluşturmayı
- git komutları ile kodu azure'a atmayı
- requirements.txt dosya içeriğinin ne işe yaradığını