"use strict";

var Handlebars = require('handlebars');

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
    template = Handlebars.compile(req.mock.template),
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

module.exports = mockedRoute;