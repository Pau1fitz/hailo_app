var express = require('express');
var server = express();
var path = require('path');

var port = process.env.PORT || 3000;

server.use(express.static(__dirname + '/public'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));

  server.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/index.html'));
  });

  server.listen(port, function() {
    console.log("Node app is running at localhost:" + port)
  })