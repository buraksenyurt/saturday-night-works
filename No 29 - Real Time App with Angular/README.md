# Socket.IO Yardımıyla RealTime Çalışan Bir Angular Uygulaması Geliştirmek

Bilindiği üzere istemci-sunucu geliştirme modelinde gerçek zamanlı ve çift yönlü iletişim için WebSocket yaygın olarak kullanılan protokollerden birisi. Klasik HTTP request/response modelinden farklı olarak WebSocket protokolünde sunucu, istemcinin talep göndermesine gerek kalmadan istemciye mesaj gönderebiliyor. Chat uygulamaları, eş zamanlı oyunlar, finansal bildirim yapan ticari programlar, online doküman yönetim sistemleri ve benzerleri WebSocket protokolünün kullanıldığı ideal ortamlar. Benim amacım ise Socket.IO'dan yararlanan bir Node sunucusu ile Angular'da yazılmış web uygulamasını WebSocket protokolü eşliğinden deneyimlemek. Bulduğum örnek bir doküman üzerinden istemcilerin eş zamanlı olarak çalışabilmesini sağlıyor. İlgimi çekince WestWorld _(Ubuntu 18.04, 64bit)_ üzerinden denemeye karar verdim.

>Makinenizde node, npm, angular CLI'ın yüklü olduğu varsayılmıştır.

## Uygulamanın İnşası

Uygulama iki önemli parçadan oluşuyor. Soket mesajlaşmasını yönetecek olan sunucu _(node.js tarafı) ve istemci _(Angular tarafı)_

### Sunucun(node.js) İnşası

```
mkdir docserver
cd docserver
mkdir src
npm init
npm install --save-dev express socket.io @types/socket.io
cd src
touch app.js
```

Sunucuyu çalıştırmak için

```
npm run start
```

komutu verilebilir.