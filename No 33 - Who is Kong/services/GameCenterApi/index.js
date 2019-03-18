
/*
GameCenterApi'den yayına alınan bu dummy servis games isimli diziyi döndüren iki basit fonksiyonelliğe sahip.
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const games = [
    {
        id: 1,
        title: 'Red Dragons',
        maxPlayerCount: 10
    },
    {
        id: 2,
        title: 'Green Barrets',
        maxPlayerCount: 24
    },
    {
        id: 3,
        title: 'River Raid',
        maxPlayerCount: 4
    },
    {
        id: 4,
        title: 'A-Team',
        maxPlayerCount: 9
    },
];

app.use(bodyParser.json());

app.get('/api/v1/games', (req, res) => {
    res.json(games);
});

app.get('/api/v1/games/:id', (req, res) => {
    res.json(games[req.params.id]);
});

app.listen(65002, () => {
    console.log(`Oyun servisi aktif! http://localhost:65002/api/v1/games`);
});