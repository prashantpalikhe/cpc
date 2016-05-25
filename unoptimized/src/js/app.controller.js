(function () {
    'use strict';

    angular
        .module('app')
        .controller('EpisodesListController', EpisodesListController)
        .controller('AppController', AppController)
        .controller('SingleEpisodeController', SingleEpisodeController)
        .controller('CurrentController', CurrentController);

    function CurrentController($location, friendsService) {
        var vm = this;

        vm.episode = friendsService.getCurrentPlayingEpisode();

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

    function AppController($element, $scope) {
        var vm = this;

        var drawer;

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;

        vm.$postLink = postLink;

        function postLink() {
            drawer = $element.find('drawer').controller('drawer');
        }

        function showMenu() {
            drawer.showDrawer();
        }

        function hideMenu() {
            drawer.hideDrawer();
        }

        $scope.$on('$locationChangeSuccess', function () {
            hideMenu();
        });
    }

    function EpisodesListController(friendsService) {
        var vm = this;
        var episodesData;

        vm.searchQuery = '';
        vm.currentPlayingEpisode = null;
        vm.episodesData = null;

        vm.search = search;

        activate();

        function activate() {
            getCurrentPlayingEpisode();
            getFriendsEpisodesData();
        }

        function getCurrentPlayingEpisode() {
            vm.currentPlayingEpisode = friendsService.getCurrentPlayingEpisode();
        }

        function getFriendsEpisodesData() {
            friendsService
                .getEpisodesData()
                .then(function onEpisodesDataReceived(result) {
                    vm.episodesData = episodesData = result;
                });
        }

        function search(query) {
            var filteredEpisodesData = [];

            if (angular.isString(query) && query !== '') {
                episodesData.forEach(function (season) {
                    var filteredSeason = {
                        id: season.id,
                        episodes: season.episodes.filter(function (episode) {
                            return ~episode.title.toLowerCase().indexOf(query.toLowerCase());
                        })
                    };

                    if (filteredSeason.episodes.length) {
                        filteredEpisodesData.push(filteredSeason);
                    }
                });
            } else {
                filteredEpisodesData = episodesData;
            }

            if (filteredEpisodesData.length) {
                vm.episodesData = filteredEpisodesData;
            }
        }
    }
})();