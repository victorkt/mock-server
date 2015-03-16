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
            $location.url('/mocks/' + id);
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
            if($scope.forms.formMock.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                vm.mock.$save();
                $location.url('/mocks');
            }
        };
    }

    function MocksEditController($rootScope, Mock, $location, $routeParams) {
        $rootScope.PAGE = "mocks";
        var vm = this;
        vm.mock = Mock.get({ _id: $routeParams.id });

        vm.save = function() {
            vm.mock.$update(function(updatedRecord) {
                vm.mock = updatedRecord;
            });

            $location.url('/mocks');
        };

        vm.delete = function() {
            vm.mock.$delete();
            $location.url('/mocks');
        };
    }

})();