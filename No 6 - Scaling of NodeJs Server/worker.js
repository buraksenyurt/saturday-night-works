var fs = require('fs');
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
            // yeni içeriği yeni bir isimle kaydedelim
            var writer = fs.createWriteStream(destination);
            writer.write(encryptedData, 'utf8');
            writer.on('finish', () => {
                console.log('File encryption is complete.');
            });
            writer.end();
        });
        resolve('success');
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
            });
            writer.end();
        });
        resolve('success');
    });
}

module.exports = {
    encrypt, decrypt
};