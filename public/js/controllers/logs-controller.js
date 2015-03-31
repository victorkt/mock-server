(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('LogsIndexController', LogsIndexController)
        .controller('LogsShowController', LogsShowController);


    function LogsIndexController($rootScope, Log, $location, $routeParams) {
        $rootScope.PAGE = "logs";
        var vm = this;
        vm.currentPage = 1;
        vm.items = Log.get($routeParams);

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
        };

        vm.show = function(id) {
            $location.url('logs/' + id);
        };
    }

    function LogsShowController($rootScope, Log, $routeParams) {
        $rootScope.PAGE = "logs";
        var vm = this;
        vm.log = Log.get({ _id: $routeParams.id });
    }

})();