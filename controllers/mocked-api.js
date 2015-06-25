'use strict';

var express = require('express'),
    db = require('../initializers/database'),
    Helpers = require('../initializers/helpers'),
    logger = require('../initializers/logger'),
    _ = require('lodash'),
    router = express.Router();

var MockedApi = {
    // the mocked api router
    router: router,

    /**
     * Loads (or reloads) all mocked routes.
     *
     * @return {Object} a promise
     */
    loadMocks: function loadMocks() {
        router.stack = [];
        return db.mocks.findAsync({})
        .then(function(mocks) {
            mocks.forEach(setupMock);
        }).catch(function(err) {
            console.error(err.stack);
        });
    }
};

/**
 * Handles all mocked routes.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next callback function
 */
function mockedRoute(req, res, next) {
    if(!req.mock) return next();

    var binds = {
        query: req.query,
        params: req.params,
        body: req.body
    },
    template = _.template(req.mock.template, { imports: Helpers.fn }),
    body = template(binds);

    // sets headers and sends response
    if(Array.isArray(req.mock.headers) && req.mock.headers.length) {
        req.mock.headers.forEach(function(header) {
            var h = header.split(':');
            res.set(h[0].trim(), h[1].trim());
        });
    }

    res.status(req.mock.status).send(body);
}

/**
 * Setup the express route for a Mock.
 *
 * @param {Object} mock The mock object
 */
function setupMock(mock) {
    var method = mock.method.toLowerCase(),
        path = '/' + mock.path;

    router[method](path, injectMock(mock), logger, mockedRoute);
}

/**
 * Middleware to inject the Mock into the Request
 * object.
 *
 * @param {Object} mock The mock object
 * @return {Function} a middleware function
 */
function injectMock(mock) {
    return function(req, res, next) {
        req.mock = mock;
        next();
    };
}

module.exports = MockedApi;