(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('MocksIndexController', ['$scope', 'Mock', '$location', '$window', MocksIndexController])
        .controller('MocksNewController', ['$scope', 'Mock', '$location', MocksNewController])
        .controller('MocksEditController', ['$scope', 'Mock', '$location', '$stateParams', MocksEditController]);


    function MocksIndexController($scope, Mock, $location, $window) {
        var vm = this;
        vm.editMock = function(mock) {
            vm.selectedMock = mock;
            $location.url('mocks/' + mock._id);
        };
        vm.loadMocks = function() {
            vm.selectedMock = undefined;
            vm.mocks = Mock.query();
        };
        vm.openMock = function(mock) {
            $window.open('m/' + mock.path, '_blank');
        };

        vm.loadMocks();

        $scope.$on('mock:created', vm.loadMocks);
        $scope.$on('mock:saved', vm.loadMocks);
        $scope.$on('mock:deleted', vm.loadMocks);
    }

    function MocksNewController($scope, Mock, $location) {
        var vm = this;
        vm.mock = new Mock({
            path: '',
            method: 'GET',
            status: 200,
            headers: [],
            template: ''
        });
        vm.save = function() {
            vm.mock.$save().then(function() {
                $scope.$emit('mock:created');
                $location.url('mocks');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };
    }

    function MocksEditController($scope, Mock, $location, $stateParams) {
        var vm = this;
        vm.mock = { headers: [] }; // prevents `Can't interpolate` errors from md-chips
        vm.loadMock = function() {
            Mock.get({ _id: $stateParams.id })
            .$promise
            .then(function(mock) {
                vm.mock = mock;
            });
        };
        vm.save = function() {
            vm.mock.$update().then(function(updatedRecord) {
                $scope.$emit('mock:saved', updatedRecord);
                $location.url('mocks');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };
        vm.delete = function() {
            vm.mock.$delete();
            $scope.$emit('mock:deleted');
            $location.url('mocks');
        };

        vm.loadMock();
    }

})();