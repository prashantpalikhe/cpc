(function () {

    angular
        .module('app')
        .controller(EpisodePlayerController.name, EpisodePlayerController);

    function EpisodePlayerController($element, friendsService) {
        var vm = this;
        var video;

        vm.$onInit = onInit;

        function onInit() {
            video = $element.find('video')[0];

            playVideo();
        }

        function playVideo() {
            video.setAttribute('src', './src/video/' + vm.episode.id + '.mp4');
            video.play();

            friendsService.saveNowPlayingEpisode(vm.episode);
        }
    }
})();