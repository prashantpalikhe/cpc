import controller from './episodePlayer.controller';

const EpisodePlayerComponent = {
    bindings: {
        episode: '<'
    },
    controller,
    template: `
        <div class="episode-player">
            <video controls>
                <source type="video/mp4" />
            </video>
        </div>
    `
};

export default EpisodePlayerComponent;