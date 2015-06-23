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
                template: '<div ui-view></div>',
                abstract: true
            })
                .state('helpers.index', {
                    url: '',
                    templateUrl: 'partials/helpers/index.html',
                    controller: 'MocksIndexController as vm'
                })
                    .state('helpers.index.new', {
                        url: '/new',
                        templateUrl: 'partials/helpers/new.html',
                        controller: 'MocksNewController as vm'
                    })
                    .state('helpers.index.edit', {
                        url: '/:id',
                        templateUrl: 'partials/helpers/edit.html',
                        controller: 'MocksEditController as vm'
                    })
            
            .state('logs', {
                url: '/logs',
                template: '<div ui-view></div>',
                abstract: true
            })
                .state('logs.index', {
                    url: '',
                    templateUrl: 'partials/logs/index.html',
                    controller: 'MocksIndexController as vm'
                })
                .state('logs.show', {
                    url: '/:id',
                    templateUrl: 'partials/logs/show.html',
                    controller: 'MocksShowController as vm'
                });
    }

})();