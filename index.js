// simple web app using the express framework for node
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  //res.send('Hello World!');
  res.sendfile('public/index.html');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});