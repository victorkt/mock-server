'use strict';

var _ = require('lodash');

var helpers = {
    valid: {
        name: 'test',
        fn: 'function(){ return "test"; }'
    },
    invalid: {},

    data: [
        {
            name: 'a_helper',
            fn: 'function(){ return "a_helper"; }'
        },
        {
            name: 'another_helper',
            fn: 'function(){ return "another_helper"; }'
        }
    ]
};

module.exports = {
    get valid() {
        return _.clone(helpers.valid);
    },
    get invalid() {
        return _.clone(helpers.invalid);
    },
    get data() {
        return _.cloneDeep(helpers.data);
    }
};