(function() {

    'use strict';

    angular.module('MockServerApp', ['ui.router', 'ngResource', 'ngMessages', 'ngMaterial'])
        .config(function($mdIconProvider, $mdThemingProvider) {
                $mdIconProvider
                    .iconSet('social', 'images/social-icons.svg', 24)
                    .iconSet('device', 'images/device-icons.svg', 24)
                    .iconSet('communication', 'images/communication-icons.svg', 24)
                    .iconSet('http-methods', 'images/http-methods.svg', 50)
                    .iconSet('core', 'images/core-icons.svg', 24)
                    .defaultIconSet('images/core-icons.svg', 24);
                    
                $mdThemingProvider
                    .theme('default')
                    .primaryPalette('teal')
                    .accentPalette('lime')
                    .warnPalette('red');
            });

})();