# Graphpack ile Biraz Daha Graphql

Son zamanlarda GraphQL'i daha fazla duymaya başladım. Facebook tarafından açık kaynak olarak geliştirilen bu API sistemi REST yerine tercih edilir olmaya başladı. Amacım onu daha çok deneyimlemek.

>Dikkat çekici özelliklerden birisi GraphQL'in REST'in aksine tek bir endpoint sunması. Bir diğeri ise strongly-typed geliştirilmiş olması ki bu sayede sorgular çalıştırılmadan önce doğrulanabiliyor. Ayrıca sadece ilgilendiğimiz veriyi okuyor veya yazmak istediğimiz veriyi gönderiyoruz _(REST'teki gibi gereğinden fazlasını değil)_

Sunucu tarafındaki konfigurasyonları minimize eden Graphpack paketini kullanarak CRUD Operasyonlarına odaklanmak istedim. Veri kaynağı olarak basit bir JSON dosya içeriği kullandım. [Şu](https://github.com/jdorfman/awesome-json-datasets) adreste yer alan kümelerden nobel ödülü alanların bulunduğu JSON dizisini ele aldım ve üzerinde GraphQL denemeleri yaptım.

## Ön Gereklilikler ve Kurulumlar

Örnek node.js tabanlı. Bu nedenle sistemde node ve npm _(ya da yarn paket yöneticisi)_ yüklü olmalı. Örneği yine WestWorld _(Ubuntu 18.04 64Bit)_ üzerinde geliştirmekteyim. Klasör hazırlıkları ve kurulumlar için aşağıdaki terminal komutlarından yararlanabiliriz.

```

```

## Neler Öğrendim?