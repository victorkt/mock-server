"use strict";

var express = require('express'),
    db = require('../initializers/database'),
    allow = require('../utils/parameter-filter'),
    router = express.Router();

router.route('/logs')

    /**
     * GET /logs
     *
     *  Lists all existing logs.
     */
    .get(function(req, res, next) {
        var limit = 50;
        var skip = (isNaN(req.query.page) || req.query.page < 1) ? 0 : (req.query.page - 1) * limit;
        var query = filter(req.query);

        db.logs.countAsync({}).then(function(count) {
            db.logs.find(query).sort({date:-1}).skip(skip).limit(limit).exec(function(err, data) {
                if(err) return next(err);
                res.json({ logs: data, perPage: limit, total: count });
            });
        });
    })

    /**
     * DELETE /logs
     *
     *  Deletes log entries based on a query.
     */
    .delete(function(req, res, next) {
        var query = filter(req.query);

        db.logs.removeAsync(query, { multi: true }).then(function() {
            res.status(204).end();
        }).catch(next);
    });

router.route('/logs/:id')

    /**
     * GET /logs/:id
     *
     *  Shows the details of a given log entry.
     */
    .get(function(req, res, next) {
        db.logs.findOneAsync({ _id: req.params.id }).then(function(logEntry) {
            if(!logEntry) return next();
            res.json(logEntry);
        }).catch(next);
    });

/**
 * Filters a parameter object, returning only the allowed keys.
 *
 * @param {Object} params The parameter object
 * @return {Object} The filtered object
 */
function filter(params) {
    return allow(params, ["mock"]);
}

// ensures the unique index on name
db.logs.ensureIndex({ fieldName: 'mock' });

module.exports = router;