'use strict';

module.exports = function(app) {
    var express = require('express'),
        mocks = require('../controllers/mocks'),
        helpers = require('../controllers/helpers'),
        logs = require('../controllers/logs'),
        MockedApi = require('../controllers/mocked-api'),
        apiRouter = express.Router();

    // loads all mocked routes
    MockedApi.loadMocks();

    // setup API routes
    apiRouter.use(mocks);
    apiRouter.use(helpers);
    apiRouter.use(logs);

    // route to Mocked resources
    app.use('/m', MockedApi.router);

    // route to API resources
    app.use('/api', apiRouter);

    // route to handle all angular requests
    app.use('*', function(req, res, next) {
        // don't render app for the mock path
        if(/^\/m($|\/.*)/.test(req.originalUrl)) {
            return next();
        }
        res.render('app');
    });
};