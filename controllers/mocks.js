'use strict';

var express = require('express'),
    db = require('../initializers/database'),
    allow = require('../utils/parameter-filter'),
    router = express.Router();

router.route('/mocks')

    /**
     * GET /mocks
     *
     *  Lists all existing mocks.
     */
    .get(function(req, res, next) {
        db.mocks.findAsync({})
            .bind(res).then(res.json)
            .catch(next);
    })

    /**
     * POST /mocks
     *
     *  Create a new mock.
     */
    .post(function(req, res, next) {
        var mock = filter(req.body);
        db.mocks.insertAsync(mock)
            .bind(res).then(res.json)
            .catch(next);
    });

router.route('/mocks/:id')

    /**
     * GET /mocks/:id
     *
     *  Shows the details of a given mock.
     */
    .get(function(req, res, next) {
        db.mocks.findOneAsync({ _id: req.params.id }).then(function(mock) {
            if(!mock) return next();
            res.json(mock);
        }).catch(next);
    })

    /**
     * PATCH /mocks/:id
     *
     *  Updates a given mock.
     */
    .patch(function(req, res, next) {
        var mock = filter(req.body);
        db.mocks.updateAsync({ _id: req.params.id }, mock, {}).then(function(numUpdated) {
            if(!numUpdated) return next();
            res.json(mock);
        }).catch(next);
    })

    /**
     * DELETE /mocks/:id
     *
     *  Deletes a given mock.
     */
    .delete(function(req, res, next) {
        db.mocks.removeAsync({ _id: req.params.id }).then(function(numDeleted) {
            if(!numDeleted) return next();
            res.status(204).end();
        }).catch(next);
    });


/**
 * Filters a parameter object, returning only the allowed keys.
 *
 * @param {Object} params The parameter object
 * @return {Object} The filtered object
 */
function filter(params) {
    return allow(params, ['path', 'method', 'status', 'headers', 'template']);
}

// ensures the unique index on path
db.mocks.ensureIndex({ fieldName: 'path', unique: true });

module.exports = router;