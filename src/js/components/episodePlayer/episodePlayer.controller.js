(function () {

    angular
        .module('app')
        .controller(EpisodePlayerController.name, EpisodePlayerController);

    function EpisodePlayerController($window, $element, friendsService) {
        var vm = this;
        var video;
        var isAutoPaused = false;

        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;

        /**
         * @ngdoc method
         * @name onInit
         * @methodOf EpisodePlayerController
         *
         * @description
         * Initialization routine of episode player component.
         */
        function onInit() {
            video = $element.find('video')[0];

            bindEvents();
            playVideo();
        }

        /**
         * @ngdoc method
         * @name onDestroy
         * @methodOf EpisodePlayerController
         *
         * @description
         * Tear-down routine of episode player component.
         */
        function onDestroy() {
            video = null;
            $window.removeEventListener('deviceorientation', onOrientationChanged, false);
        }

        /**
         * @private
         *
         * @description
         * Binds event handlers to component elements.
         */
        function bindEvents() {
            $window.addEventListener('deviceorientation', onOrientationChanged, false);
        }

        /**
         * @private
         *
         * @description
         * Auto pauses the video when display is facing down and resumes playing
         * once the display faces up again.
         *
         * @param {DeviceOrientationEvent} event
         */
        function onOrientationChanged(event) {
            var isFacingDown = (event.alpha === 0 && event.beta === 180 && event.gamma === 0);
            var isFacingUp = (event.alpha === 0 && event.beta === 0 && event.gamma === 0);

            if (isFacingDown && !video.paused) {
                isAutoPaused = true;
                video.pause();
            }

            if (isFacingUp && video.paused && isAutoPaused) {
                isAutoPaused = false;
                video.play();
            }
        }

        /**
         * @private
         *
         * @description
         * Starts playing the episode given to the component.
         */
        function playVideo() {
            video.setAttribute('src', './src/video/' + vm.episode.id + '.mp4');
            video.play();

            friendsService.saveNowPlayingEpisode(vm.episode);
        }
    }
})();