class NowPlayingController
{
    constructor ($location) {
        this.$location = $location;
    }

    startWatching() {
        this.$location.path(`/watch/${this.episode.id}`);
    }
}

NowPlayingController.$inject = [
    '$location'
];

export default NowPlayingController;