'use strict';

var config = require('../config/database'),
    Promise = require('bluebird');

var Database;
var DBs = {
    mocks: undefined,
    helpers: undefined,
    logs: undefined,

    connect: connectToDB
};

function connectToDB() {
    Database = Promise.promisifyAll(require('mongodb'));
    DBs.ObjectId = Database.ObjectId;
    
    return Database
    .connectAsync(config.connString)
    .then(function(db) {
        DBs.mocks = db.collection('mocks');
        DBs.helpers = db.collection('helpers');
        DBs.logs = db.collection('logs');
    }).catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
        process.exit(1);
    });
}

module.exports = DBs;