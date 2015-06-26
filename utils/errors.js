'use strict';

var Errors = {
    NotFound: function NotFound(id) {
        var msg = 'The ID "' + id + '" was not found.';
        var err = Error.call(this, msg);
        err.status = 404;
        return err;
    }
};

Errors.NotFound.prototype = Object.create(Error.prototype);

module.exports = Errors;