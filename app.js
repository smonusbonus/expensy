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
app.get('*', function (req, res, next) {

  var basePath = req._parsedUrl.pathname.split('/');
  basePath = basePath[1];

  if (basePath !== 'api') {
    res.sendfile(__dirname + '/public' + req._parsedUrl.pathname);
  } else {
    next();
  }
});


/**
 * API
 */

// database connection
var mongodb = require('mongodb'),
  mongoUri = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017',
  mongoClient = mongodb.mongoClient;

console.log(mongodb);
console.log(mongoUri);
console.log(mongoClient);

app.get('/api/expenses', function (req, res) {
  //res.send('Hello API');
  //res.send(200, { id: 7882, firstName: 'Simon' });

  console.log('you reached the API');


  mongoClient.connect(mongoUri, function (err, db) {

    // operate on the collection named "expenses"
    var expenesCollection = db.collection('expenses');

    expenesCollection.find({}).limit(30).toArray(function (err, docs) {
      if (err) {
        return console.error(err);
      }
      console.log('searching for docs');

      docs.forEach(function (doc) {
        console.log('found document: ', doc);
      });
    });

  });

});





/*app.get('/api/*', function (req, res) {
  //res.send('Hello API');
  console.log('you reached the API');
  res.send(200, { id: 7882, firstName: 'Simon' });
});*/







/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});