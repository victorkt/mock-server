"use strict";

var Handlebars = require('handlebars'),
    db = require('../initializers/database');

// setup helpers
function setupHelpers() {
    db.helpers.findAsync({}).then(function(helpers) {
        helpers.forEach(function(helper) {
            Handlebars.unregisterHelper(helper.name);
            Handlebars.registerHelper(helper.name, eval("(" + helper.fn + ")"));
        });
    }).catch(function(err) {
        console.error(err.stack);
    });
}

module.exports = setupHelpers;