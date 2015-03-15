"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./initializers/routes'),
    db = require('./initializers/database'),
    logger = require('./initializers/logger'),
    app = express();

// middleware
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup handlebars helpers
require('./initializers/handlebars-helpers')();

// setup routes
app.use(logger);
app.use('/api', routes);

// route to handle all angular requests
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

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