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
            if($scope.forms.formHelper.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                vm.helper.$save();
                $location.url('helpers/');
            }
        };
    }

    function HelpersEditController($rootScope, Helper, $location, $routeParams) {
        $rootScope.PAGE = "helpers";
        var vm = this;
        vm.helper = Helper.get({ _id: $routeParams.id });

        vm.save = function() {
            vm.helper.$update(function(updatedRecord) {
                vm.helper = updatedRecord;
            });

            $location.url('helpers/');
        };

        vm.delete = function() {
            vm.helper.$delete();
            $location.url('helpers/');
        };
    }

})();