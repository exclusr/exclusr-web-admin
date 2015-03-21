var express = require('express');
var app = express();
var morgan = require('morgan');

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static('./app'));

app.get('/', function (req, res) {
  res.sendFile('./app/index.html');
});

app.listen(port, function () {
  console.log('Express server is listening at PORT %d', port);
});