(function () {
    'use strict';

    angular
        .module('app')
        .controller('EpisodesListController', EpisodesListController)
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

    function EpisodesListController(friendsService) {
        var vm = this;
        var episodesData;

        vm.searchQuery = '';
        vm.nowPlayingEpisode = null;
        vm.episodesData = null;

        vm.search = search;

        activate();

        function activate() {
            getNowPlayingEpisode();
            getFriendsEpisodesData();
        }

        function getNowPlayingEpisode() {
            vm.nowPlayingEpisode = friendsService.getNowPlayingEpisode();
        }

        function getFriendsEpisodesData() {
            friendsService
                .getEpisodesData()
                .then(function onEpisodesDataReceived(result) {
                    vm.episodesData = episodesData = result;
                });
        }

        function search(query) {
            friendsService.searchByTitle(query).then(function (filteredEpisodesData) {
                vm.episodesData = filteredEpisodesData;
            });
        }
    }
})();