(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('MocksIndexController', MocksIndexController)
        .controller('MocksNewController', MocksNewController)
        .controller('MocksEditController', MocksEditController);


    function MocksIndexController($rootScope, Mock, $location) {
        $rootScope.PAGE = "mocks";
        var vm = this;
        vm.mocks = Mock.query();

        vm.show = function(id) {
            $location.url('mocks/' + id);
        };
    }

    function MocksNewController($scope, $rootScope, Mock, $location) {
        $rootScope.PAGE = "mocks";
        var vm = this;
        vm.mock = new Mock({
            path: '',
            method: 'GET',
            status: 200,
            headers: '',
            template: ''
        });

        vm.save = function() {
            if(vm.forms.formMock.$valid) {
                vm.mock.$save().then(function() {
                    $location.url('mocks/');
                }).catch(function(err) {
                    $scope.$broadcast('server:message', err);
                });
            }
        };
    }

    function MocksEditController($scope, $rootScope, Mock, $location, $routeParams) {
        $rootScope.PAGE = "mocks";
        var vm = this;
        vm.mock = Mock.get({ _id: $routeParams.id });

        vm.save = function() {
            vm.mock.$update().then(function(updatedRecord) {
                vm.mock = updatedRecord;
                $location.url('mocks/');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };

        vm.delete = function() {
            vm.mock.$delete();
            $location.url('mocks/');
        };
    }

})();