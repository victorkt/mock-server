'use strict';

var db = require('./database');

function requestLogger(req, res, next) {
    if(!req.mock) return next();
    var start = Date.now(),
    log = {
        mock: req.mock._id,
        path: req.mock.path,
        date: (new Date()).toISOString(),
        request: {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body
        },
        response: {}
    };

    res.on('finish', function responseSent() {
      log.response.time = Date.now() - start;
      log.response.status = res.statusCode;
      log.response.headers = res._headers;

      db.logs.insert(log);
    });

    next();
}

module.exports = requestLogger;