'use strict';

var db = require('./database');

var Helpers = {
    fn: {},
    reload: function() {
        var self = this;
        
        db.helpers.findAsync({}).then(function(helpers) {
            helpers.forEach(function(helper) {
                self.fn[helper.name] = eval('(' + helper.fn + ')');
            });
        }).catch(function(err) {
            console.error(err.stack);
        });
    }
};

module.exports = Helpers;