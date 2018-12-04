var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'), function (err) {
        res.status(500).send(err);
    })
});

app.get('/login', function (req, res) {
    //todo: login mantığı eklenecek
    res.end();
});


app.listen(5001);
console.log('server is online on port 5001');