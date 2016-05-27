(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleEpisodeController', SingleEpisodeController)

    function SingleEpisodeController($routeParams, friendsService) {
        var vm = this;

        vm.episode = null;

        activate();

        function activate() {
            getEpisode();
        }

        function getEpisode() {
            friendsService
                .findEpisode($routeParams.episodeId)
                .then(function (episode) {
                    vm.episode = episode;
                });
        }
    }
})();