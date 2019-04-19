/*
Bu kodun aslında bir araç üzerinde olduğunu varsayalım.
*/

// soket sunucusuna bağlantı oluşturuyoruz
// socket.io-client modülünü kullanıyoruz
let socket = require('socket.io-client')('http://localhost:5555');

// örnek simülasyon verimiz. Hız, devir ve motor sıcaklığı gibi
let engineData = {
    "speed": 0,
    "rpm": 0,
    "heat": 0
};

// Her 5 saniyede bir çalışacak bir fonksiyon.
setInterval(function () {
    // Rastgele veriler üretiyoruz.
    engineData.speed = Math.floor(Math.random() * 180) + 70;
    engineData.rpm = Math.floor(Math.random() * 10000) + 1000;
    engineData.heat = Math.floor(Math.random() * 100) + 300;

    console.log(`Üretilen veri\nHız:${engineData.speed}\nDevir:${engineData.rpm}\nMotor sıcaklığı:${engineData.heat}`);
    /* 
        Veriyi emit metodu ile "input road" namespace'ini kullanarak sunucuya yolluyoruz
        oradaki callback'de devreye girip bu veriyi bağlı olan diğer istemcilere 
        (output road, namespace'ini kullanan) yayınlayacak.
    */
    socket.emit("input road", engineData);
}, 5000);