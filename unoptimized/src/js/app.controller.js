(function () {
    'use strict';

    angular
        .module('app')
        .controller('EpisodesListController', EpisodesListController)
        .controller('AppController', AppController)
        .controller('SingleEpisodeController', SingleEpisodeController);

    function SingleEpisodeController() {
        var vm = this;
    }

    function AppController($element) {
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
    }

    function EpisodesListController(friendsService) {
        var vm = this;
        var episodesData;

        vm.searchQuery = '';

        vm.search   = search;

        activate();

        function activate() {
            getFriendsEpisodesData();
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