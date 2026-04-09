# Güncellemeler

- Yükselitelen paketler : fastify, fastify-swagger, mongoose, nodemon.
- MongoDb için *docker-compose* eklendi.

## Kodsal Değişikliler

- **package.json:** `start` script bildiriminde Windows'ta çalışmayan Unix yolu (`./node_modules/nodemon/bin/nodemon.js`) yerine `nodemon` komutu kullanacak şekilde düzeltildi.
- **index.js:** Fastify 3.x ile uyumsuz olan `fastify.listen(4005)` çağrısı, nesne parametresi alacak şekilde değiştirildi; `fastify.listen({ port: 4005, host: '127.0.0.1' })`
- **routes/swagger-help/minionApi.js:** `getAllMinionSchema` response şeması `type: 'object'` yerine `type: 'array'` olarak düzeltildi zira Fastify' da sonradan değişen serileştirici kuralı nedeniyle dizi yanıtı boş nesne `[]` şeklinde dönüyordu.

## Testler

- [x] Windows 11 testleri
- [ ] Ubuntu testleri

![Win11 Test 1](./assets/credit_5.png)
