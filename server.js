'use strict';

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    app = express();

app.engine('html', cons.lodash);

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// connects to database
require('./initializers/database').connect().then(function() {
    // setup routes
    require('./initializers/routes')(app);

    // setup helpers
    require('./initializers/helpers').reload();

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    // will print stacktrace
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err.stack
        });
    });

    app.listen(process.env.MOCK_PORT || 3000);
});