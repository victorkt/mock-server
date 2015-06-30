(function() {

    'use strict';

    angular.module('MockServerApp')
        .factory('Helper', ['$resource', Helper]);


    function Helper($resource) {
        return $resource('api/helpers/:_id', { _id: "@_id" }, {
            'update': { method: 'PATCH' }
        });
    }

})();