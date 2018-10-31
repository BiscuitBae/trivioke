const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const key = require('../config.js');
const db = require('../db/mysql.js');

const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));
// app.use(express.static(`${__dirname}/../dist/index.html`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/songs', (req, res) => {
  db.connection.query('select * from songs', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

const getSongs = () => {
  const options = {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      type: 'video',
      key: key.youtube,
      channelId: 'UCXosPWESPuLZoG66YuHKX9Q',
      maxResults: 50,
    },
  };
  axios.get('https://www.googleapis.com/youtube/v3/search', options)
    .then((data) => {
      data.data.items.forEach((song) => {
        db.save(song);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

app.post('/songs', (req, res) => {
  getSongs(req, res);
  res.sendStatus(200);
});

app.post('/signUp', (req, res) => {
  bcrypt.hash(req.query.pw, saltRounds, (err, hash) => {
    if (err) {
      console.log (err)
    } else {
      // db.connection.query()
    }
});
  // .then((data))
  // .catch((err))
});

app.get('/login', (req, res) => {
  //check login info against db info
  //redirect client
})

const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
