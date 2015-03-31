"use strict";

var morgan = require('morgan'),
    db = require('./database');

// options object for morgan
var opts = {
    stream: {
        write: function(msg) {
            var log = JSON.parse(msg);
            if(log.mock !== '-') db.logs.insert(log);
        }
    }
};

// create token :id
morgan.token('id', function getId(req) {
    if(req.mock) return req.mock._id;
    return null;
});

// create token :mockpath
morgan.token('mockpath', function getMockPath(req) {
    if(req.mock) return req.mock.path;
    return null;
});

// create token :reqheaders
morgan.token('reqheaders', function getReqHeaders(req) {
    return JSON.stringify(req.headers);
});

// create token :reqbody
morgan.token('reqbody', function getReqBody(req) {
    return JSON.stringify(req.body)
            .replace(/\\"/g, '"')
            .replace(/"/g, '\\"');
});

// set log format for morgan
var format = '{ "mock": ":id", "path": ":mockpath", "date": ":date[iso]", "request": { "method": ":method", "url": ":url", "headers": :reqheaders, "body": ":reqbody" }, "response": { "time": :response-time, "status": :status } }';

module.exports = morgan(format, opts);