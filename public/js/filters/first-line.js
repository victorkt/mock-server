(function() {

    'use strict';

    angular.module('MockServerApp')
        .filter('firstLine', FirstLine);


    function FirstLine() {
        return function(input) {
            return input.split("\n")[0];
        };
    }

})();