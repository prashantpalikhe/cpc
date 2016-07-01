import './nowPlaying.css';
import controller from './nowPlaying.controller';

const NowPlayingComponent = {
    bindings: {
        episode: '<'
    },
    controller,
    template: `
        <div class="current">
            <button class="current__trigger" ng-click="$ctrl.startWatching()">
                Continue watching "{{ $ctrl.episode.title }}"
            </button>
        </div>
    `
};

export default NowPlayingComponent;