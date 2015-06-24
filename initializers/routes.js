'use strict';

module.exports = function(app) {
    var express = require('express'),
        db = require('./database'),
        index = require('../controllers/index'),
        mocks = require('../controllers/mocks'),
        helpers = require('../controllers/helpers'),
        logs = require('../controllers/logs'),
        mockedRoute = require('../controllers/api'),
        apiRouter = express.Router();

    // setup routes
    apiRouter.use(mocks);
    apiRouter.use(helpers);
    apiRouter.use(logs);

    // setup mocked routes middleware
    apiRouter.use('/:id(*)', function(req, res, next) {
        db.mocks.findOneAsync({ path: req.params.id, method: req.method.toUpperCase() }).then(function(mock) {
            req.mock = mock;
            next();
        }).catch(function(err) {
            console.error(err.stack);
        });
    });

    // setup mocked routes handler
    apiRouter.use(mockedRoute);

    // route to API resources
    app.use('/api', apiRouter);

    // route to handle all angular requests
    app.use('/', index);
};