(function () {
    'use strict';

    angular
        .module('app')
        .controller('NowPlayingEpisodeController', NowPlayingEpisodeController);

    function NowPlayingEpisodeController($location) {
        var vm = this;

        vm.startWatching = startWatching;

        function startWatching() {
            $location.path(`/watch/${vm.episode.id}`);
        }
    }
})();