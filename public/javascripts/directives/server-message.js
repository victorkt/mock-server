(function() {

    'use strict';

    angular.module('MockServerApp')
        .directive('serverMessage', ServerMessage);


    function ServerMessage() {
        return {
            restrict: 'E',
            templateUrl: 'partials/directives/server-message.html',
            link: function (scope, element, attr) {
                scope.$on('server:message', function (event, err) {
                    scope.serverMessage = err;
                });
            }
        };
    }

})();