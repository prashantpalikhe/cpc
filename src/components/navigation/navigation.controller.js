class NavigationController
{
    constructor(friendsService) {
        friendsService.getEpisodesData().then((episodesData) => this.episodesData = episodesData);
    }
}

NavigationController.$inject = [
    'friendsService'
];

export default NavigationController;