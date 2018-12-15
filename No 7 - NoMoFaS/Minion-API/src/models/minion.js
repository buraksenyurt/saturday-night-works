const mongoose = require('mongoose')

// mini isimli şemayı tanımladık. 
// Minion filmindeki bir karakteri temsil ediyor
const minionSchema = new mongoose.Schema({
    nickname: String,
    age: Number,
    gender: String
})

module.exports = mongoose.model('Minion', minionSchema)