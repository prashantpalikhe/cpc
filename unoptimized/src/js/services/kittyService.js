(function () {
    'use strict';

    angular
        .module('app')
        .factory('kittyService', kittyService);

    function kittyService($http) {
        var kittyService = {
            getKitties: getKitties
        };

        return kittyService;

        function getKitties() {
            return $http
                .get('./src/data/kitties.json')
                .then(function onKittiesReceived(response) {
                    return response.data;
                });
        }
    }
})();