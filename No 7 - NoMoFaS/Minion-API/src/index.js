//gerekli modüller yüklenir
const fastify = require('fastify')({ logger: true })
const routes = require('./routes') //route modüllerinin yeri söylendi
const swagger = require('./config/swagger') //swager konfigurasyonunun yeri söylendi
fastify.register(require('fastify-swagger'), swagger.options) // swagger, fastify için kayıt edildi
const mongoose = require('mongoose')

// routes klasöründeki tüm modülleri fastify ile ilişkilendiriyoruz
routes.forEach((route, index) => {
    fastify.route(route)
})

// mongodb'ye bağlanılıyor. minions isimli veritabanı yoksa oluşturulacaktır
mongoose.connect('mongodb://localhost/animation', { useNewUrlParser: true })
    .then(() => console.log('MongoDB ile iletişim kuruldu'))
    .catch(err => console.log(err))

// sunucu 4005 nolu porttan yayın yapacak.
// asenkron çalışır
const online = async () => {
    try {
        await fastify.listen(4005)
        fastify.swagger()
        fastify.log.info(`Sunucu ${fastify.server.address().port} adresi üzerinden dinlemede`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
online()