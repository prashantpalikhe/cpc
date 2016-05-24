(function () {

    angular
        .module('app')
        .controller('EpisodePlayerController', EpisodePlayerController);

    function EpisodePlayerController($element, friendsService) {
        var vm = this;
        var video;

        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;

        function onInit() {
            video = $element.find('video')[0];

            bindEvents();
            setPlaybackTime();
        }

        function setPlaybackTime() {
            if (angular.isDefined(vm.episode.timeStamp)) {
                video.addEventListener('loadedmetadata', function () {
                    video.currentTime = vm.episode.timeStamp;
                    video.play();
                });
                
            } else {
                video.play();
            }
        }

        function saveCurrentPlayingEpisode() {
            var data = angular.extend(
                {},
                vm.episode,
                {timeStamp: video.currentTime}
            );

            friendsService.saveCurrentPlayingEpisode(data);
        }

        function bindEvents() {
            video.addEventListener('playing', saveCurrentPlayingEpisode)
            video.addEventListener('progress', saveCurrentPlayingEpisode)
            video.addEventListener('seeked', saveCurrentPlayingEpisode);
        }

        function unBindEvents() {
            video.removeEventListener('playing', saveCurrentPlayingEpisode)
            video.removeEventListener('progress', saveCurrentPlayingEpisode)
            video.removeEventListener('seeked', saveCurrentPlayingEpisode);
        }

        function onDestroy() {
            unBindEvents();

            video.pause();
        }
    }
})();