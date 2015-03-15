"use strict";

var Handlebars = require('handlebars'),
    db = require('../initializers/database');

// setup helpers
function setupHelpers() {
    db.helpers.findAsync({}).then(function(helpers) {
        helpers.forEach(function(helper) {
            Handlebars.unregisterHelper(helper._id);
            Handlebars.registerHelper(helper._id, eval("(" + helper.fn + ")"));
        });
    }).catch(function(err) {
        console.error(err.stack);
    });
}

module.exports = setupHelpers;