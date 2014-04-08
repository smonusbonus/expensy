/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  app = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 5000);

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// serve all remaining files the client asks for
app.get('*', function (req, res) {

  //console.log(req._parsedUrl.pathname);
  res.sendfile(__dirname + '/public' + req._parsedUrl.pathname);

});


/**
 * API
 */



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
