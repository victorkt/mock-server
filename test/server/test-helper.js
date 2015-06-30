'use strict';

if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}

if(process.env.NODE_ENV === 'test') {
    process.env.MOCK_MONGO_DB = 'mock_server_test';
}