"use strict";

var morgan = require('morgan'),
    db = require('./database');

// options object for morgan
var opts = {
    stream: {
        write: function(msg) {
            db.logs.insert(JSON.parse(msg));
        }
    }
};

// create token :id
morgan.token('id', function getId(req) {
    if(req.mock) return req.mock._id;
    return null;
});

// create token :reqbody
morgan.token('reqbody', function getReqBody(req) {
    return JSON.stringify(req.body)
            .replace(/\\"/g, '"')
            .replace(/"/g, '\\"');
});

// set log format for morgan
var format = '{ "mock": ":id", "date": ":date[iso]", "request": { "method": ":method", "headers": ":req[header]", "body": ":reqbody" }, "response": { "time": :response-time, "status": :status } }';

module.exports = morgan(format, opts);