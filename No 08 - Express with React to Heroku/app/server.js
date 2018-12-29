var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5005; //heroku'nun portu veya local geliştirme için belirlediğimiz 5005 nolu port

// statik klasör bildirimini yapıyoruz
app.use(express.static(path.join(__dirname, 'fromwestworld/build')));

//canlı ortamdaysak yani uygulamamız Heroku'ya alınmışsa
if (process.env.NODE_ENV === 'production') {
    // build klasöründen index.html dosyasını alıp get talebinin karşılığı olarak istemciye sunuyoruz
    app.use(express.static(path.join(__dirname, 'fromwestworld/build')));
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'fromwestworld/build/index.html'));
    })
}

// Eğer canlı ortamda(heroku'da) değilsek ve amacımız sadece localhost'ta test ise
// index.html'i public klasöründen sunuyoruz
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/fromwestworld/public/index.html'));
})

// express sunucusunu çalıştırıyoruz
app.listen(port, (req, res) => {
    console.log(`sunucumuz ${port} nolu porttan yayındadır`);
})