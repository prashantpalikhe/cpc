(function () {
    'use strict';

    angular
        .module('app')
        .component('episodePlayer', {
            template: `
                <div class="episode-player">
                    <video controls>
                        <source type="video/mp4" />
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