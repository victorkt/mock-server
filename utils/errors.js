'use strict';

var Errors = {
    AlreadyConnected: function AlreadyConnected(msg) {
        var err = Error.call(this, msg);
        err.status = 500;
        return err;
    },
    NotFound: function NotFound(id) {
        var msg = 'The ID "' + id + '" was not found.';
        var err = Error.call(this, msg);
        err.status = 404;
        return err;
    }
};

Errors.AlreadyConnected.prototype = Object.create(Error.prototype);
Errors.NotFound.prototype = Object.create(Error.prototype);

module.exports = Errors;