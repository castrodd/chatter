var http = require('http');
var fs = require('fs');
var ErrorPage = require('error-page')
var extract = require('./extract');

var server = http.createServer(function (req, res) {
  res.error = ErrorPage(req, res, {
    "*": 'There was a problem with your request. Please try again.',
    debug: false // show full stack traces, or just messages
  })
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      return res.error(404);
    } else {
      res.end(data);
    }
  })
});

server.listen(3000);
