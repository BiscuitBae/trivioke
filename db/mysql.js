/* eslint-disable no-console */
const mysql = require('mysql2/promise');
require('dotenv').config();


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'trivioke',
});

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to trivioke db');
//   }
// });

// this should only happen once;
const save = (data) => {
  console.log(data);
  const q = `insert into songs(song, uri) values ('${data.snippet.title}', '${data.id.videoId}') on duplicate key update uri=uri`;
  connection.query(q, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('songs saved to db');
    }
  });
};

module.exports.save = save;
module.exports.connection = connection;
