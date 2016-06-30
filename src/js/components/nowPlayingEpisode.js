import angular from 'angular';

const nowPlayingEpisode = angular
    .module('nowPlayingEpisode', [])
    .component('nowPlayingEpisode', {
        bindings: {
            episode: '<'
        },
        controller: function NowPlayingEpisodeController($location) {
            var vm = this;

            vm.startWatching = startWatching;

            function startWatching() {
                $location.path(`/watch/${vm.episode.id}`);
            }
        },
        template: `
            <div class="current">
                <button class="current__trigger" ng-click="$ctrl.startWatching()">
                    Continue watching "{{ $ctrl.episode.title }}"
                </button>
            </div>
        `
    })
    .name;

export default nowPlayingEpisode;