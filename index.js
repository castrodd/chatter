var http = require('http');
var read = require('./read')

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  read(req, res, 'app');
});

server.listen(3000);
