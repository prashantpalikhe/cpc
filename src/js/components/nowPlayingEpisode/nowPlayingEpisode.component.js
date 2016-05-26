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
            template: `
                <div class="current">
                    <a class="current__trigger" ng-href="#/current">
                        Continue watching "{{ $ctrl.episode.title }}"
                    </a>
                </div>
            `
        }
    }
})();