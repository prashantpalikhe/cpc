(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($element, friendsService) {
        var vm = this;
        var episodesData;

        var drawer;

        vm.searchQuery = '';

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;
        vm.search   = search;
        vm.$postLink = postLink;

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

        function postLink() {
            drawer = $element.find('drawer').controller('drawer');
        }

        function showMenu() {
            drawer.showDrawer();
        }

        function hideMenu() {
            drawer.hideDrawer();
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