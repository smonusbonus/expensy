// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                           // create our app w/ express
    var mongoose = require('mongoose');                 // mongoose for mongodb
    var morgan = require('morgan');                     // log requests to the console (express4)
    var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
    var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

    // configuration =================
    mongoose.connect('mongodb://localhost/expensy');     // connect to mongoDB database

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define model =================
    var Expense = mongoose.model('Expense', {
        amount : Number,
        time: String,
        date: String,
        location: String,
        description: String,
        categoryId: Number
    });

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all expenses
    app.get('/api/expenses', function(req, res) {

        Expense.find(function(err, expenses) {

            if (err) {
                res.send(err);
            }
            res.json(expenses); // return all expenses in JSON format
        });
    });

    // get expense based on ID
    app.get('/api/expenses/:expenseId', function(req, res) {

        Expense.find({

            _id : req.params.expenseId

            }, function(err, expense) {
                if (err) { res.send(err); }
                res.json(expense);
        });
    });

    // create expense and send back all todos after creation
    app.post('/api/expenses', function(req, res) {

        // create an expense, information comes from AJAX request from Angular
        Expense.create(req.body, function(err, expense) {
            if (err)
                res.send(err);

            // get and return all the expenses after you create another
            Expense.find(function(err, expenses) {
                if (err) {
                    res.send(err);
                } 
                res.json(expenses);
            });
        });
    });

    // delete a todo
    app.delete('/api/expenses/:expenseId', function(req, res) {
        Expense.remove({
            _id : req.params.expenseId
        }, function(err, expense) {
            if (err) { res.send(err); }

            res.json({deletion: true});
        });
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");