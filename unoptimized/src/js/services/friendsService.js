(function () {
    'use strict';

    angular
        .module('app')
        .factory('friendsService', friendsService);

    function friendsService($http) {
        var friendsService = {
            getEpisodesData: getEpisodesData
        };

        return friendsService;

        function getEpisodesData() {
            return $http
                .get('./src/data/episodes.json')
                .then(function onEpisodesDataReceived(response) {
                    return response.data;
                });
        }
    }
})();