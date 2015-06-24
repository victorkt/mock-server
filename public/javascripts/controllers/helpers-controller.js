(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('HelpersIndexController', ['$scope', 'Helper', '$location', HelpersIndexController])
        .controller('HelpersNewController', ['$scope', 'Helper', '$location', HelpersNewController])
        .controller('HelpersEditController', ['$scope', 'Helper', '$location', '$stateParams', HelpersEditController]);


    function HelpersIndexController($scope, Helper, $location) {
        var vm = this;
        vm.editHelper = function(helper) {
            vm.selectedHelper = helper;
            $location.url('helpers/' + helper._id);
        };
        vm.loadHelpers = function() {
            vm.selectedHelper = undefined;
            vm.helpers = Helper.query();
        };

        vm.loadHelpers();

        $scope.$on('helper:created', vm.loadHelpers);
        $scope.$on('helper:saved', vm.loadHelpers);
        $scope.$on('helper:deleted', vm.loadHelpers);
    }

    function HelpersNewController($scope, Helper, $location) {
        var vm = this;
        vm.helper = new Helper({
            name: '',
            fn: ''
        });
        vm.save = function() {
            vm.helper.$save().then(function() {
                $scope.$emit('helper:created');
                $location.url('helpers');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };
    }

    function HelpersEditController($scope, Helper, $location, $stateParams) {
        var vm = this;
        vm.helper = Helper.get({ _id: $stateParams.id });
        vm.save = function() {
            vm.helper.$update().then(function(updatedRecord) {
                $scope.$emit('helper:saved', updatedRecord);
                $location.url('helpers');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };
        vm.delete = function() {
            vm.helper.$delete();
            $scope.$emit('helper:deleted');
            $location.url('helpers');
        };
    }

})();