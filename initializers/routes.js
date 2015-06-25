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

    // setup API routes
    apiRouter.use(mocks);
    apiRouter.use(helpers);
    apiRouter.use(logs);

    // setup mocked routes handler
    apiRouter.use(mockedRoute);

    // route to API resources
    app.use('/api', apiRouter);

    // route to handle all angular requests
    app.use('/', index);
};