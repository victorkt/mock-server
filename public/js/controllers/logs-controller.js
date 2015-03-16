(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('LogsController', LogsController);


    function LogsController($rootScope, Log) {
        $rootScope.PAGE = "logs";
        var vm = this;
        vm.logs = [];

        Log.get().success(function(data) {
            vm.logs = data;
        });
    }

})();