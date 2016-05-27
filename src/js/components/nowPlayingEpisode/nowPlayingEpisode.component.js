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
            controller: 'NowPlayingEpisodeController',
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