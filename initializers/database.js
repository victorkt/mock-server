"use strict";

var DataStore = require('nedb'),
    Promise = require('bluebird');

module.exports = {
    mocks: Promise.promisifyAll(new DataStore({ filename: 'db/mocks.db', autoload: true })),
    helpers: Promise.promisifyAll(new DataStore({ filename: 'db/helpers.db', autoload: true })),
    logs: Promise.promisifyAll(new DataStore({ filename: 'db/logs.db', autoload: true }))
};