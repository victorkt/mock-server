'use strict';

var express = require('express'),
    db = require('../initializers/database'),
    Helpers = require('../initializers/helpers'),
    _ = require('lodash'),
    router = express.Router();

/**
 * Handles all mocked routes.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next callback function
 */
router.use('/:id(*)', loadMocks, function mockedRoute(req, res, next) {
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
});

// setup mocked routes middleware
function loadMocks(req, res, next) {
    db.mocks
    .findOneAsync({ path: req.params.id, method: req.method.toUpperCase() })
    .then(function(mock) {
        req.mock = mock;
        next();
    }).catch(function(err) {
        console.error(err.stack);
    });
};

module.exports = router;