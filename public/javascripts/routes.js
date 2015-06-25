(function() {

    'use strict';

    angular.module('MockServerApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', setRoutes]);


    // ==========================================================================
    //  Routes
    // ==========================================================================

    function setRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/mocks');

        // Now set up the states
        $stateProvider
            .state('mocks', {
                url: '/mocks',
                data: {
                    title: 'Mocks',
                    tabIndex: 0
                },
                templateUrl: 'partials/mocks/mocks.html',
                abstract: true
            })
                .state('mocks.index', {
                    url: '',
                    templateUrl: 'partials/mocks/index.html',
                    controller: 'MocksIndexController as vm'
                })
                    .state('mocks.index.new', {
                        url: '/new',
                        templateUrl: 'partials/mocks/new.html',
                        controller: 'MocksNewController as vm'
                    })
                    .state('mocks.index.edit', {
                        url: '/:id',
                        templateUrl: 'partials/mocks/edit.html',
                        controller: 'MocksEditController as vm'
                    })
            
            .state('helpers', {
                url: '/helpers',
                data: {
                    title: 'Helpers',
                    tabIndex: 1
                },
                templateUrl: 'partials/helpers/helpers.html',
                abstract: true
            })
                .state('helpers.index', {
                    url: '',
                    templateUrl: 'partials/helpers/index.html',
                    controller: 'HelpersIndexController as vm'
                })
                    .state('helpers.index.new', {
                        url: '/new',
                        templateUrl: 'partials/helpers/new.html',
                        controller: 'HelpersNewController as vm'
                    })
                    .state('helpers.index.edit', {
                        url: '/:id',
                        templateUrl: 'partials/helpers/edit.html',
                        controller: 'HelpersEditController as vm'
                    })
            
            .state('logs', {
                url: '/logs',
                data: {
                    title: 'Logs',
                    tabIndex: 2
                },
                templateUrl: 'partials/logs/logs.html',
                abstract: true
            })
                .state('logs.index', {
                    url: '',
                    templateUrl: 'partials/logs/index.html',
                    controller: 'LogsIndexController as vm'
                });
    }

})();