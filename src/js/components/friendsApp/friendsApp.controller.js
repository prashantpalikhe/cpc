(function () {
    'use strict';

    angular
        .module('app')
        .controller(FriendsAppController.name, FriendsAppController);

    function FriendsAppController($element, $scope, friendsService) {
        var vm = this;

        var drawer;

        vm.nowPlayingEpisode = null;
        vm.episodesData = null;

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;
        vm.search = search;

        vm.$postLink = postLink;

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
                    vm.episodesData = result;
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
            friendsService.searchByTitle(query).then(function (filteredEpisodesData) {
                vm.episodesData = filteredEpisodesData;
            });
        }

        $scope.$on('$locationChangeSuccess', function () {
            hideMenu();
            activate();
        });
    }
})();