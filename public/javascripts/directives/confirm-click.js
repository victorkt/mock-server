(function() {

    'use strict';

    angular.module('MockServerApp')
        .directive('confirmClick', ['$mdDialog', ConfirmClick]);


    function ConfirmClick($mdDialog) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var msg = attr.confirmClick || 'Are you sure?',
                    clickAction = attr.confirmedClick;

                element.bind('click', function (event) {
                    var confirm = $mdDialog.confirm()
                      .parent(angular.element(document.body))
                      .title('Confirmation')
                      .content(msg)
                      .ok('Yes')
                      .cancel('No')
                      .targetEvent(event);
                    $mdDialog.show(confirm).then(function() {
                      scope.$eval(clickAction);
                    });
                });
            }
        };
    }

})();