"use strict";

var express = require('express'),
    db = require('../initializers/database'),
    router = express.Router();

router.route('/logs')

    /**
     * GET /logs
     *
     *  Lists all existing logs.
     */
    .get(function(req, res, next) {
        var skip = isNaN(req.query.page) ? 0 : req.query.page * 10;
        var query = {};
        if(req.query.id)
            query.mock = req.query.id;

        db.logs.find(query).limit(10).sort({date:-1}).skip(skip).exec(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

// ensures the unique index on name
db.logs.ensureIndex({ fieldName: 'mock' });

module.exports = router;