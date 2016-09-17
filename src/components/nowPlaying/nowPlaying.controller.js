function NowPlayingController($location) {
    var vm = this;

    vm.startWatching = startWatching;

    function startWatching() {
        $location.path(`/watch/${vm.episode.id}`);
    }
}

NowPlayingController.$inject = [
    '$location'
];

export default NowPlayingController;