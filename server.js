const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let musicLibrary = [];

function loadMusicLibrary() {
    fs.readFile(path.join(__dirname, "data", "musicLibrary.json"), 'utf8', (err, data) => {
        if(err){
            console.log("error reading library: ", err);
            return;
        };
        musicLibrary = JSON.parse(data);
    });
}

app.get('/musicLibrary', (req, res) => {
    res.json(musicLibrary);
});

app.post('/musicLibrary', (req, res) => {
    const newSong = req.body;
    musicLibrary.push(newSong);

    fs.writeFile(path.join(__dirname, "data", "musicLibrary.json", JSON.stringify(musicLibrary, null, 2), 'utf8', (err) => {
        if(err){
            res.status(500).json({error: "Error writing the song into the JSON"});
            return;
        }
        res.status(201).json({message: 'Song written into JSON successfully'})
    }));
});

app.listen(PORT, () => {
    console.log(`Server is up on https://localhost:${PORT}`);
    loadMusicLibrary();
})