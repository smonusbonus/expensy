// hello world example
/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(process.env.PORT || 1337)

console.log('Server running at http://127.0.0.1:1337/');*/

// simple web app using the express framework for node
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen((process.env.PORT || 3000), function() {
    console.log('Listening on port %d', server.address().port);
});