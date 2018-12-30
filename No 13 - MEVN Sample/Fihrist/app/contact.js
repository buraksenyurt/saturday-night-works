// MongoDb'de koleksiyonunun karşılığı olan model tanımı
var mongoose = require('mongoose')

// contact isimli bir şemamız var
// örnek olması açısından bir kaç özellik içeriyor
var contact = new mongoose.Schema({
    fullname: { type: String },
    phoneNumber: { type: String },
    location: { type: String },
    birtdate: { type: Date }
},
    {
        collection: 'contacts' // kontaklarımızı tuttuğumuz koleksiyon
    }
)

module.exports = mongoose.model('Contact', contact)