"use strict";

var express = require('express'),
    db = require('./database'),
    mocks = require('../controllers/mocks'),
    helpers = require('../controllers/helpers'),
    mockedRoute = require('../controllers/api'),
    router = express.Router();

// setup routes
router.use(mocks);
router.use(helpers);

// setup mocked routes middleware
router.use('/api/:id(*)', function(req, res, next) {
    db.mocks.findOneAsync({ _id: req.params.id, method: req.method.toUpperCase() }).then(function(mock) {
        req.mock = mock;
        next();
    }).catch(function(err) {
        console.error(err.stack);
    });
});

// setup mocked routes handler
router.use(mockedRoute);


module.exports = router;