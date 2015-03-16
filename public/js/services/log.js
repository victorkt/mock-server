(function() {

    'use strict';

    angular.module('MockServerApp')
        .factory('Log', Log);


    function Log($http) {
        return {
            get: function() {
                return $http.get("/api/logs");
            }
        };
    }

})();