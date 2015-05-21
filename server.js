'use strict';

var config = require('./configuration.js');

var express = require('express');
var app = express();
var morgan = require('morgan');
var engine = require('ejs-mate');

var port = process.env.PORT || 3000;

app.engine('ejs', engine);

app.set('views', __dirname + '/app');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('./app'));

app.get('/', function (req, res) {
  res.render('index', {
    SERVER_URL: config.SERVER_URL
  });
});

app.listen(port, function () {
  console.log('Express server is listening at PORT %d', port);
});