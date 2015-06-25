'use strict';

var cfg = {
    type: process.env.MOCK_DB || 'nedb',
    host: process.env.MOCK_MONGO_HOST || 'localhost',
    port: process.env.MOCK_MONGO_PORT || 27017,
    db: process.env.MOCK_MONGO_DB || 'mock_server',
    user: process.env.MOCK_MONGO_USER,
    pass: process.env.MOCK_MONGO_PASS
};

if(/mongodb/i.test(cfg.type)) {
    cfg.connString = 'mongodb://' + cfg.host + ':' + cfg.port + '/' + cfg.db;
}

module.exports = cfg;