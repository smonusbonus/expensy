/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  app = express(),

// database connection
  mongo = require('mongodb'),
  mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

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
app.get('*', function (req, res, next) {

  var basePath = req._parsedUrl.pathname.split('/');
  basePath = basePath[1];

  if (basePath !== 'api') {
    res.sendfile(__dirname + '/public' + req._parsedUrl.pathname);
  } else {
    next();
  }
});

app.get('/api/*', function (req, res) {
  //res.send('Hello API');
  console.log('you reached the API');
  res.send(200, { id: 7882, firstName: 'Simon' });
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
