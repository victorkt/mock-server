(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('TopToolbarController', ['$state', TopToolbarController]);


    function TopToolbarController($state) {
        var ttc = this;
        ttc.state = $state;
    }

})();