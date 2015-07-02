'use strict';

var express = require('express'),
    db = require('../initializers/database'),
    allow = require('../utils/parameter-filter'),
    NotFound = require('../utils/errors').NotFound,
    MockedApi = require('../controllers/mocked-api'),
    ObjectId = db.ObjectId,
    router = express.Router();

router.route('/mocks')

    /**
     * GET /mocks
     *
     *  Lists all existing mocks.
     */
    .get(function(req, res, next) {
        db.mocks
        .find({})
        .sort({ path: 1 })
        .toArrayAsync()
        .then(res.json.bind(res))
        .catch(next);
    })

    /**
     * POST /mocks
     *
     *  Create a new mock.
     */
    .post(function(req, res, next) {
        var mock = filter(req.body);
        db.mocks
        .insertAsync(mock)
        .then(function(result) {
            MockedApi.loadMocks();
            res.status(201).json(mock);
        })
        .catch(function(err) {
            if(err.code === 11000) {
                err.status = 400;
            }
            next(err);
        });
    });

router.route('/mocks/:id')

    /**
     * GET /mocks/:id
     *
     *  Shows the details of a given mock.
     */
    .get(function(req, res, next) {
        db.mocks
        .findOneAsync({ _id: ObjectId(req.params.id) })
        .then(function(mock) {
            if(!mock) {
                return next(new NotFound(req.params.id));
            }
            res.json(mock);
        })
        .catch(next);
    })

    /**
     * PATCH /mocks/:id
     *
     *  Updates a given mock.
     */
    .patch(function(req, res, next) {
        var mock = filter(req.body);
        db.mocks
        .updateOneAsync({ _id: ObjectId(req.params.id) }, { $set: mock })
        .then(function(r) {
            if(!r.result.n) {
                return next(new NotFound(req.params.id));
            }
            MockedApi.loadMocks();
            res.status(202).json(mock);
        })
        .catch(next);
    })

    /**
     * DELETE /mocks/:id
     *
     *  Deletes a given mock.
     */
    .delete(function(req, res, next) {
        db.mocks
        .removeAsync({ _id: ObjectId(req.params.id) })
        .then(function(r) {
            if(!r.result.n) {
                return next(new NotFound(req.params.id));
            }
            MockedApi.loadMocks();
            res.status(204).end();
        })
        .catch(next);
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

// ensures the indexes
db.mocks.ensureIndexAsync({ path: 1, method: 1 }, { unique: true });

module.exports = router;