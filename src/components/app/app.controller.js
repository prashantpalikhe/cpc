class AppController
{
    constructor($element, $scope, friendsService) {
        this.$element = $element;
        this.friendsService = friendsService;

        this.episodesData = [];
        this.nowPlayingEpisode = null;

        this.activate();

        $scope.$on('$locationChangeSuccess', () => {
            this.hideMenu();
            this.activate();
        });
    }

    activate() {
        this.getNowPlayingEpisode();
        this.getFriendsEpisodesData();
    }

    showMenu() {
        this.drawer.showDrawer();
    }

    hideMenu() {
        this.drawer.hideDrawer();
    }

    search(query) {
        this.friendsService
            .searchByTitle(query)
            .then((filteredEpisodesData) => this.episodesData = filteredEpisodesData);
    }

    $postLink() {
        this.drawer = this.$element.find('drawer').controller('drawer');
    }

    getNowPlayingEpisode() {
        this.nowPlayingEpisode = this.friendsService.getNowPlayingEpisode();
    }

    getFriendsEpisodesData() {
        this.friendsService
            .getEpisodesData()
            .then((result) => this.episodesData = result);
    }
}

AppController.$inject = [
    '$element',
    '$scope',
    'friendsService'
];

export default AppController;