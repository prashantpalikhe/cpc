class EpisodePlayerController
{
    constructor($window, $element, friendsService) {
        this.$window = $window;
        this.$element = $element;
        this.friendsService = friendsService;

        this.video = null;
        this.isAutoPaused = false;

        this.onOrientationChanged = this.onOrientationChanged.bind(this);
    }

    $onInit() {
        this.video = this.$element.find('video')[0];

        this.bindEvents();
        this.playVideo();
    }

    $onDestroy() {
        this.video = null;
        this.$window.removeEventListener('deviceorientation', this.onOrientationChanged, false);
    }

    bindEvents() {
        this.$window.addEventListener('deviceorientation', this.onOrientationChanged, false);
    }

    playVideo() {
        this.video.setAttribute('src', '/video/' + this.episode.id + '.mp4');
        this.video.play();

        this.friendsService.saveNowPlayingEpisode(this.episode);
    }

    onOrientationChanged(event) {
        let isFacingDown = (event.alpha === 0 && event.beta === 180 && event.gamma === 0);
        let isFacingUp = (event.alpha === 0 && event.beta === 0 && event.gamma === 0);

        if (isFacingDown && !this.video.paused) {
            this.isAutoPaused = true;
            this.video.pause();
        }

        if (isFacingUp && this.video.paused && this.isAutoPaused) {
            this.isAutoPaused = false;
            this.video.play();
        }
    }
}

EpisodePlayerController.$inject = [
    '$window',
    '$element',
    'friendsService'
];

export default EpisodePlayerController;
