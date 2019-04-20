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
    engineData.speed = getRandomValue(70, 180);
    engineData.rpm = getRandomValue(1000, 10000);
    engineData.heat = getRandomValue(100, 500);

    console.log(`Üretilen veri\nHız:${engineData.speed}\nDevir:${engineData.rpm}\nMotor sıcaklığı:${engineData.heat}`);
    /* 
        Veriyi emit metodu ile "input road" namespace'ini kullanarak sunucuya yolluyoruz
        oradaki callback'de devreye girip bu veriyi bağlı olan diğer istemcilere 
        (output road, namespace'ini kullanan) yayınlayacak.
    */
    socket.emit("input road", engineData);
}, 5000);

/* 
    Rastgele veri üertmek için kullandığımız basit fonksiyon.
    İki değer aralığında veri üretiyor.
*/
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}