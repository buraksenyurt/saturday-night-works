var fs = require('fs');
var sleep = require('sleep');
var cryptr = require('cryptr'); //kripto modülü
var brazovich = new cryptr('StrangerTHingS-1903');

function encrypt(source, destination) {
    return new Promise(async (resolve, reject) => {
        // Önce örnek dosyayı okuyalım
        var data = '';
        var reader = fs.createReadStream(source, 'utf8');
        reader.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            // şifreleme işlemini yapalım
            const encryptedData = brazovich.encrypt(data);
            sleep.sleep(Math.floor(Math.random() * 5) + 1);
            // yeni içeriği yeni bir isimle kaydedelim
            var writer = fs.createWriteStream(destination);
            writer.write(encryptedData, 'utf8');
            writer.on('finish', () => {
                console.log('File encryption is complete.');
                resolve('success');
            });
            writer.end();
        });
    });
}

function decrypt(source, destination) {
    return new Promise(async (resolve, reject) => {
        var data = '';
        var reader = fs.createReadStream(source, 'utf8');
        reader.on('data', function (chunk) {
            data += chunk;
        }).on('end', () => {
            // ters şifreleme işlemini yapalım
            const decryptedData = brazovich.decrypt(data);
            // yeni içeriği yeni bir isimle kaydedelim
            var writer = fs.createWriteStream(destination);
            writer.write(decryptedData, 'utf8');
            writer.on('finish', () => {
                console.log('File decryption is complete.');
                resolve('success');
            });
            writer.end();
        });
    });
}

module.exports = {
    encrypt, decrypt
};