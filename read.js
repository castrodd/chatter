var fs = require('fs');
var extract = require('./extract');
const mime = require('mime');

var handleError = function (err, res) {
  res.writeHead(404);
  res.end("There was a problem with your request. Please try again.");
}

var read = function (req, res, dir) {
  var filePath = extract(req.url, dir);
  var ext = mime.getType(filePath);
  console.log(ext);

  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', ext);
      res.end(data);
    }
  })
}

module.exports = read;
