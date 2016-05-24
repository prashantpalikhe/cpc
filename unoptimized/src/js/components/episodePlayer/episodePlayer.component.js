(function () {
    'use strict';

    angular
        .module('app')
        .component('episodePlayer', {
            template: `
                <div class="episode-player">
                    <video controls>
                        <source ng-src="{{ episodePlayer.episode.videoUrl }}" type='video/webm;codecs="vp8, vorbis"' />
                    </video>
                </div>
            `,
            controller: 'EpisodePlayerController',
            controllerAs: 'episodePlayer',
            bindings: {
                episode: '<'
            }
        });
})();