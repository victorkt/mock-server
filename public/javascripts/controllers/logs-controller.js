(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('LogsIndexController', ['Log', '$scope', '$q', '$mdDialog', LogsIndexController])
        .controller('LogsShowController', ['Log', '$mdDialog', 'id', LogsShowController]);


    function LogsIndexController(Log, $scope, $q, $mdDialog) {
        var vm = this;
        vm.selected = [];
        vm.query = {
            order: '-date',
            limit: 10,
            page: 1
        };
        vm.purge = function() {
            vm.items = Log.delete();
        };
        vm.delete = function() {
            var promises = [];
            vm.selected.forEach(function(log) {
                promises.push(Log.delete({ _id: log._id }).$promise);
            });
            vm.selected = [];
            $q.all(promises).then(getLogs, getLogs);
        };
        vm.show = function(id, event) {
            $mdDialog.show({
                controller: 'LogsShowController as vm',
                templateUrl: 'partials/logs/show.html',
                parent: angular.element(document.body),
                targetEvent: event,
                locals: { id: id }
            });
        };
        
        $scope.$watchCollection('vm.query', function (newValue, oldValue) {
            if(newValue === oldValue) return;
            getLogs();
        });

        function getLogs() {
            vm.items = Log.get(vm.query);
        }
    }

    function LogsShowController(Log, $mdDialog, id) {
        var vm = this;
        vm.log = Log.get({ _id: id });
        vm.hide = $mdDialog.hide;
        vm.cancel = $mdDialog.cancel;
    }

})();