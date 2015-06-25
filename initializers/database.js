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
    switch(true) {
        case /nedb/i.test(config.type):
            Database = require('nedb');
            DBs.mocks = Promise.promisifyAll(new Database({ filename: 'db/mocks.db', autoload: true }));
            DBs.helpers = Promise.promisifyAll(new Database({ filename: 'db/helpers.db', autoload: true }));
            DBs.logs = Promise.promisifyAll(new Database({ filename: 'db/logs.db', autoload: true }));
           
            return Promise.resolve();
        case /mongodb/i.test(config.type):
            Database = Promise.promisifyAll(require('mongodb'));

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
        default:
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!! Invalid database type \'' + config.type + '\'.');
            console.log('!! Valid options are: \'nedb\', \'mongodb\'.');
            console.log('!! Set the database type using MOCK_DB enviroment variable.');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            process.exit(1);
    }
}

module.exports = DBs;