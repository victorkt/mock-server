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
    res.set(JSON.parse(req.mock.headers));
    res.status(req.mock.status).send(body);
}

module.exports = mockedRoute;