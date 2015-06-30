'use strict';

var config = require('../config/database'),
    Promise = require('bluebird'),
    Database = Promise.promisifyAll(require('mongodb')),
    AlreadyConnected = require('../utils/errors').AlreadyConnected;

var DBs = {
    mocks: undefined,
    helpers: undefined,
    logs: undefined,

    connected: false,
    ObjectId: Database.ObjectId,
    connect: connectToDB
};

function connectToDB() {
    return Promise
    .resolve()
    .then(function() {
        if(DBs.connected) {
            throw new AlreadyConnected();
        } else {
            return Database.connectAsync(config.connString);
        }
    })
    .then(function(db) {
        DBs.mocks = db.collection('mocks');
        DBs.helpers = db.collection('helpers');
        DBs.logs = db.collection('logs');
    })
    .catch(AlreadyConnected, function(){});
}

module.exports = DBs;