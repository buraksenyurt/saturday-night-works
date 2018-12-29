// MongoDb'de koleksiyonunun karşılığı olan model tanımı
var mongoose = require('mongoose')

// contact isimli bir şemamız var
var contact = new mongoose.Schema({
    fullname: { type: string },
    phoneNumber: { type: string },
    location: { type: string },
    birtdate: { type: Date }
},
    {
        collection: contacts // kontaklarımızı tuttuğumuz koleksiyon
    }
)

module.exports = mongoose.model('Contact', contact)