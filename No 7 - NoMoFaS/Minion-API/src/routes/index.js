// controller tipini içeriye tanımladık
const minionController = require('../controllers/minionController')
const help = require('./swagger-help/minionApi') // swagger yardım dokümanının yeri söylendi

// HTTP Get, Post, Put, Delete tanımlamalarını yapıyoruz
const handlers = [
    {
        method: 'GET', // alt satırdaki adrese HTTP Get talebi gelirse
        url: '/api/minions',
        handler: minionController.getAll, //controller'daki getAll metoduna yönlendir
        schema: help.getAllMinionSchema
    },
    {
        method: 'GET', //alt satırdaki adrese HTTP Get talebi gelirse
        url: '/api/minions/:id',
        handler: minionController.getSingle //controller'daki getSingle metoduna yönlendir
    },
    {
        method: 'POST', //alttaki adres için POST talebi gelirse
        url: '/api/minions',
        handler: minionController.add, // yeni bir mini ekleme isteği nedeniyle controller'daki add metoduna yönlendir
        schema: help.addMinionSchema
    },
    {
        method: 'PUT', //aşağıdaki adres için PUT talebi gelirse
        url: '/api/minions/:id',
        handler: minionController.update //güncelleme sebebiyle update metoduna yönlendir
    },
    {
        method: 'DELETE', //aşağıdaki adres için HTTP Delete talebi gelirse
        url: '/api/minions/:id',
        handler: minionController.delete //miniyi silmek için controller'daki delete metodunu çağır
    }
]

module.exports = handlers // handlers isimli array'deki metodları modül dışına aç