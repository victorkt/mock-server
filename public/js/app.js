(function() {

    'use strict';

    angular.module('MockServerApp', ["ngRoute", "ngResource", "ngMessages"])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/mocks', {
                    controller: "MocksIndexController",
                    controllerAs: 'vm',
                    templateUrl: "views/mocks/index.html"
                })
                .when('/mocks/new', {
                    controller: "MocksNewController",
                    controllerAs: 'vm',
                    templateUrl: "views/mocks/new.html"
                })
                .when('/mocks/:id', {
                    controller: "MocksEditController",
                    controllerAs: 'vm',
                    templateUrl: "views/mocks/edit.html"
                })
                .when('/helpers', {
                    controller: "HelpersIndexController",
                    controllerAs: 'vm',
                    templateUrl: "views/helpers/index.html"
                })
                .when('/helpers/new', {
                    controller: "HelpersNewController",
                    controllerAs: 'vm',
                    templateUrl: "views/helpers/new.html"
                })
                .when('/helpers/:id', {
                    controller: "HelpersEditController",
                    controllerAs: 'vm',
                    templateUrl: "views/helpers/edit.html"
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });

})();