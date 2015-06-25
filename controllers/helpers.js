'use strict';

var express = require('express'),
    db = require('../initializers/database'),
    Helpers = require('../initializers/helpers'),
    allow = require('../utils/parameter-filter'),
    router = express.Router();

router.route('/helpers')

    /**
     * GET /helpers
     *
     *  Lists all existing helpers.
     */
    .get(function(req, res, next) {
        db.helpers.findAsync({})
            .bind(res).then(res.json)
            .catch(next);
    })

    /**
     * POST /helpers
     *
     *  Create a new helper.
     */
    .post(function(req, res, next) {
        var helper = filter(req.body);
        db.helpers.insertAsync(helper).then(function(helper) {
            Helpers.reload();
            res.json(helper);
        }).catch(next);
    });

router.route('/helpers/:id')

    /**
     * GET /helpers/:id
     *
     *  Shows the details of a given helper.
     */
    .get(function(req, res, next) {
        db.helpers.findOneAsync({ _id: req.params.id }).then(function(helper) {
            if(!helper) return next();
            res.json(helper);
        }).catch(next);
    })

    /**
     * PATCH /helpers/:id
     *
     *  Updates a given helper.
     */
    .patch(function(req, res, next) {
        var helper = filter(req.body);
        db.helpers.updateAsync({ _id: req.params.id }, helper, {}).then(function(numUpdated) {
            if(!numUpdated) return next();
            Helpers.reload();
            res.json(helper);
        }).catch(next);
    })

    /**
     * DELETE /helpers/:id
     *
     *  Deletes a given helper.
     */
    .delete(function(req, res, next) {
        db.helpers.removeAsync({ _id: req.params.id }).then(function(numDeleted) {
            if(!numDeleted) return next();
            Helpers.reload();
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
    return allow(params, ['name', 'fn']);
}

// ensures the unique index on name
db.helpers.ensureIndex({ fieldName: 'name', unique: true });

module.exports = router;