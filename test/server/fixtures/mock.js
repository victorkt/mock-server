'use strict';

var _ = require('lodash');

var mocks = {
    valid: {
        path: 'test',
        method: 'GET',
        status: 200,
        headers: [
            'Accept: application/json'
        ],
        template: '{ "message": "test" }'
    },
    invalid: {
        method: 'NONE'
    },

    data: [
        {
            path: 'a_path',
            method: 'GET',
            status: 200,
            headers: [
                'Content-Type: application/json'
            ],
            template: '{ "message": "test" }'
        },
        {
            path: 'another/path',
            method: 'POST',
            status: 201,
            headers: [
                'Accept: application/json'
            ],
            template: '{ "created": "ok" }'
        },
        {
            path: 'some/other/path',
            method: 'DELETE',
            status: 204,
            headers: [],
            template: '{ "deleted": 1 }'
        }
    ]
};

module.exports = {
    get valid() {
        return _.clone(mocks.valid);
    },
    get invalid() {
        return _.clone(mocks.invalid);
    },
    get data() {
        return _.cloneDeep(mocks.data);
    }
};