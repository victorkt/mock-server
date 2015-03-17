(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('LogsController', LogsController);


    function LogsController($rootScope, Log) {
        $rootScope.PAGE = "logs";
        var vm = this;
        vm.currentPage = 1;
        vm.items = Log.get();

        vm.totalItems = function() {
            var total = vm.items.total || 0;
            var perPage = vm.items.perPage || 1;
            return new Array(Math.ceil(total/perPage));
        };

        vm.setPage = function (pageNo) {
            if(pageNo < 1 || pageNo > vm.totalItems().length)
                return;

            vm.items = Log.get({ page: pageNo });
            vm.currentPage = pageNo;
        };

        vm.purge = function() {
            m.currentPage = 1;
            vm.items = Log.delete();
        }
    }

})();