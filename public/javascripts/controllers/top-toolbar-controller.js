(function() {

    'use strict';

    angular.module('MockServerApp')
        .controller('TopToolbarController', ['$scope', '$state', TopToolbarController]);


    function TopToolbarController($scope, $state) {
        var ttc = this;
        ttc.state = $state;

        $scope.$watchCollection('ttc.state.current', function (newValue, oldValue) {
            if(newValue === oldValue) return;
            if(typeof newValue.data === 'object') {
                ttc.title = newValue.data.title;
                ttc.tabIndex = newValue.data.tabIndex;
            }
        });
    }

})();