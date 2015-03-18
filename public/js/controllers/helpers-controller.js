(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('HelpersIndexController', HelpersIndexController)
        .controller('HelpersNewController', HelpersNewController)
        .controller('HelpersEditController', HelpersEditController);


    function HelpersIndexController($rootScope, Helper, $location) {
        $rootScope.PAGE = "helpers";
        var vm = this;
        vm.helpers = Helper.query();

        vm.show = function(id) {
            $location.url('helpers/' + id);
        };
    }

    function HelpersNewController($scope, $rootScope, Helper, $location) {
        $rootScope.PAGE = "helpers";
        var vm = this;
        vm.helper = new Helper({
            name: '',
            fn: ''
        });

        vm.save = function() {
            if(vm.forms.formHelper.$valid) {
                vm.helper.$save().then(function() {
                    $location.url('helpers/');
                }).catch(function(err) {
                    $scope.$broadcast('server:message', err);
                });
            }
        };
    }

    function HelpersEditController($scope, $rootScope, Helper, $location, $routeParams) {
        $rootScope.PAGE = "helpers";
        var vm = this;
        vm.helper = Helper.get({ _id: $routeParams.id });

        vm.save = function() {
            vm.helper.$update().then(function(updatedRecord) {
                vm.helper = updatedRecord;
                $location.url('helpers/');
            }).catch(function(err) {
                $scope.$broadcast('server:message', err);
            });
        };

        vm.delete = function() {
            vm.helper.$delete();
            $location.url('helpers/');
        };
    }

})();