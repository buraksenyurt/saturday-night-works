const boom = require('boom') //bomba gibi bir hata mesajı yöneticisi
const Minion = require('../models/minion')

// yeni bir Minion karakteri eklemek için
exports.add = async (req, res) => {
    try {
        // Minion bilgilerini request'in body'sinden aldık
        const mini = new Minion(req.body)
        return mini.save() //kaydedip sonucu geriye döndürdük
    } catch (err) {
        throw boom.boomify(err)
    }
}

// bir Minion karakterini güncellemek için
exports.update = async (req, res) => {
    try {
        // güncelleme işlemini gerçekleştir
        const result = await Minion.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}

// bir Minion karakterini silmek için
exports.delete = async (req, res) => {
    try {
        // query parametresi olarak gelen id'den ilgili Minion bul ve kaldır
        const result = await Minion.findByIdAndRemove(req.params.id)
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}

// id bilgisinden Minion bul
exports.getSingle = async (req, res) => {
    try {
        const result = await Minion.findById(req.params.id)
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}

// ne kadar Minion varsa geriye döndür
exports.getAll = async (req, res) => {
    try {
        const result = await Minion.find()
        console.log(result)
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}