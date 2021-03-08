const express = require('express');
const path = require('path');
const app = express();
const api = require('./server/api');
const cors = require('cors');

app.use(cors());
app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', api);

 app.use(express.static(path.join(__dirname, 'build'))); 

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); 

module.exports = app;