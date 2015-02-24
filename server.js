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

    app.use(express.static(__dirname + '/build'));                 // set the static files location /public/img will be /img for users
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
    // get all todos
    app.get('/api/expenses', function(req, res) {

        // use mongoose to get all todos in the database
        Expense.find(function(err, expenses) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }
                
            res.json(expenses); // return all expenses in JSON format
        });
    });

    // create todo and send back all todos after creation
    /*app.post('/api/expenses', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Expense.create({
            description : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });*/


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");