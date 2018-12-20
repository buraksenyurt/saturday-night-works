var express = require('express');
var app = express();
var port = process.env.port || 5005;

app.get('/', (req, res) => {
    res.send('<h1>Merhaba. Ben dostum :P</h1>');
});

app.listen(port, (req, res) => {
    console.log(`sunucu dinlemede. ${port}`);
});