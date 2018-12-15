# Node.js, MongoDB, Fastify ve Swagger Kullanılan bir uygulama

Amacım başlıktaki konuları kullanarak komple bir Web API uygulaması geliştirmek. West-World'de (Ubuntu 18.04) Node.js, npm ve MongoDB yüklü. Bu örnek sayesinde javascript, node.js, mongodb ve REST API bilgilerimi tazelemiş _(geliştirmiş)_ olacağım.

## Klasör Ağacı ve Paketler

Uygulamanın iskeleti başlangıçta şöyle kurgulanabilir.

```
mkdir Minion-API
cd Minion-API
mkdir src
cd src
touch index.js
npm init
```

Gerekli paketleri kurmak içinse...

```
npm i nodemon mongoose fastify fastify-swagger boom
```

nodemon'u herhangibir dosyada değişiklik olduğunda node sunucusunu otomatik olarak yeniden başlatmak için kullanıyoruz. Ancak kullanımı için package.json'daki start komutunu değiştirdik.

mongoose, mongodb ile konuşabilmek için. Fastify, Hapi ve Express'ten ilham alınmış oldukça hızlı bir web framework ve onu deneyimlemek istedim. API dokümantasyonu içinse Fastify'a Swagger desteği veren Fastify-swagger modülünü kullandık. HTTP hata mesajları içinde boom isimli utility paketinden yararlanıyoruz.