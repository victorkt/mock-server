'use strict';

/**
 * Filters an object with allowed parameters.
 * The result is a new Object with all allowed parameters
 * from the original object.
 * Example:
 *      var allow = require('parameter-filter');
 *      var original = { firstname: "John", lastname: "Doe", "admin": true };
 *      allow(original, ["firstname", "lastname"]); // => { firstname: "John", lastname: "Doe" }
 *
 * @param {Object} object The original object to be filtered
 * @param {Array} allowedParams An array containing the allowed parameters
 * @return {Object} The filtered object
 */
module.exports = function(object, allowedParams) {
    return Object.keys(object).reduce(function(newObject, param) {
        if (allowedParams.indexOf(param) !== -1)
            newObject[param] = object[param];

        return newObject;
    }, {});
}