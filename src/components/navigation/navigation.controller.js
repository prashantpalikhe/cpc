function NavigationController(friendsService) {
    var vm = this;

    vm.episodesData = null;

    friendsService.getEpisodesData().then(function (episodesData) {
        vm.episodesData = episodesData;
    });
}

export default NavigationController;