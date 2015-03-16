(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('HomeController', HomeController);


    function HomeController($rootScope) {
        $rootScope.PAGE = "home";
    }

})();