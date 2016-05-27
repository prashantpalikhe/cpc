(function () {
    'use strict';

    angular
        .module('app')
        .component('nowPlayingEpisode', nowPlayingEpisodeComponent());

    function nowPlayingEpisodeComponent() {
        return {
            bindings: {
                episode: '<'
            },
            controller: function ($location) {
                var vm = this;

                vm.startWatching = startWatching;

                function startWatching() {
                    $location.path('/current');
                }
            },
            template: `
                <div class="current">
                    <button class="current__trigger" ng-click="$ctrl.startWatching()">
                        Continue watching "{{ $ctrl.episode.title }}"
                    </button>
                </div>
            `
        }
    }
})();