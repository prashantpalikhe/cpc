(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleEpisodeController', SingleEpisodeController)
        .controller('CurrentController', CurrentController);

    function CurrentController($location, friendsService) {
        var vm = this;

        vm.episode = friendsService.getNowPlayingEpisode();

        if (!angular.isObject(vm.episode)) {
            $location.path('#/');
        }
    }

    function SingleEpisodeController($routeParams, friendsService) {
        var vm = this;

        vm.episode = null;

        activate();

        function activate() {
            getEpisode();
        }

        function getEpisode() {
            friendsService
                .findEpisode(
                    parseInt($routeParams.seasonId, 10),
                    $routeParams.episodeId
                )
                .then(function (episode) {
                    vm.episode = episode;
                });
        }
    }
})();