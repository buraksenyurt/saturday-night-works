# Kimdir Bu Kong?

Hali hazırda çalışmakta olduğum firmada, microservice'lerin orkestrasyonu için KONG isimli bir araç kullanılıyor. Kabaca bir API Gateway rolünü üstlenen KONG microservice'lere gelen request'lerle ilgili olarak Load Balancing, Authentication, Rate Limiting, Caching, Logging gibi cross-cutting olarak tabir edebileceğimiz yapıları hazır olarak sunuyor(muş) Web, Mobil ve IoT gibi uygulamalar geliştirirken backend servisleri çoğunlukla microservis formunda yaşamaktalar. Bunların orkestrasyonunda görev alan KONG, Lua dili ile geliştirilmiş açık kaynaklı bir proje olmasıyla da dikkat çekiyor.

Benim amacım ilk etapta KONG'u WestWorld _(Ubuntu 18.04, 64bit)_ üzerine kurmak ve en az bir servis geliştirip ona gelen talepleri KONG üzerinden geçirmeye çalışmak. Normal şartlarda KONG'u sisteme tüm gereksinimleri ile kurabiliriz ancak denemeler için docker imajlarını kullanmak da yeterli olacaktır ki ben bu yolu tercih ediyorum.

## Kobay REST servisleri

Çalışmada en azından bir Web API servisinin olması lazım. Bir tane .net core bir tane de node.js tabanlı servis geliştirmeye karar verdim. WestWorld'de uyguladığım terminal komutları şöyle.

```
mkdir services
cd services
dotnet new webapi -o FabrikamApi
touch Dockerfile
touch .dockerignore
mkdir GameCenterApi
cd GameCenterApi
npm init
sudo npm i --save express body-parser
touch index.js
touch Dockerfile
```

 FabrikamApi servisindeki hazır kod dosyalarında bir kaç değişiklik yapıp, GameCenterApi klasöründeki index.js'i sıfırdan geliştirmem gerekti. Servislerin normal kullanım örneklerine ait Postman dosyalarını [burada - postman_samples.json isimli dosya](assets/postman_samples.json) bulabilirsiniz. Development noktasında servislerin çalıştığını kontrol etmemiz gerekiyor. .Net Core tabanlı servisi çalıştırmak için 

```
dotnet run
```

terminal komutunu verip http://localhost:65001/api/v1/players üzerinden hareket edebiliriz. GameCenterApi isimli Node.js tabanlı servisi çalıştırmak içinse package.json içerisine aldığımız start kod adlı script'i işlettirebiliriz.

```
npm run start
```

Sonrasında http://localhost:65002/api/v1/games adresi üzerinden bu servisi de deneyimleyebiliriz.

>localhost bilgisi ilerleyen kısımlarda görüleceği gibi Docker'a geçildikten değişmektedir.

## Servislerin Dockerize Edilmesi

Dikkat edilmesi gereken noktalardan birisi de, her iki örneğin Dockerize edilebilecek şekilde Dockerfile dosyaları ile donatılmış olmalarıdır. İlaveten .Net Core uygulamasında .dockerignore dosyası vardır. Bunu build context'ini ufalamak için kullanıyoruz. Docker imajları KONG tarafından kullanılacaktır. FabrikamApi için Dockerize işlemleri aşağıdaki terminal komutlarıyla yapılabilir.

```
docker build -t fma_docker .
```

GameCenterApi isimli Node.js uygulaması içinse aşağıdaki gibi.

```
docker build -t gca_docker .
```

Dockerize işlemleri tamamlandıktan sonra container'ları çalıştırıp kontrol etmemizde yarar var. İlk iki komutla ayağa kaldırıp son komutla listede olup olmadıklarına bakıyoruz.

```
docker run -d --name=game_center_api gca_docker
docker run -d --name=fabrikam_api fma_docker
docker ps -a
```

WestWord'de durum şu şekilde.

![assets/credit_1.png](assets/credit_1.png)

>Docker imajları çalışmaya başladıktan sonra servislere hangi IP adresi üzerinden gitmemiz gerektiğine bakmak için 'docker inspect game_center_api' ve 'docker inspect fabrikam_api' komutlarından yararlanabiliriz. Bize uzun bir Json içeriği dönecektir ancak son kısımda IPAddress bilgisini görebiliriz. WestWorld için docker tabanlı adresler http://172.17.0.3:65001/api/v1/players ve http://172.17.0.2:65002/api/v1/games şeklinde oluştu. Sizin sisteminizde bu IP adresleri farklı olabilir.

![assets/credit_2.png](assets/credit_2.png)

![assets/credit_3.png](assets/credit_3.png)

## Kong Kurulumları ve Docker Servislerinin Dahil Edilmesi

>throw new NotImplementedException();

## Çalışma Zamanı

>throw new NotImplementedException();

## Yararlandığım Diğer Docker Komutları

Çalışan Container'ları stop komutu sonrası durduramayınca,

```
sudo killall docker-containerd-shim
```

Container'larımı görmek içinse,

```
docker ps -a
```

Container'ları sık sık remove etmem gerektiği için,

```
docker rm {ContainerID}
```

Container'ın tüm bilgilerini görmek için _(özellikle IP adresini)_

```
docker inspect {container adı}
```

## Neler Öğrendim

>throw new NotImplementedException();