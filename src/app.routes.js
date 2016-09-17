routing.$inject = ['$routeProvider'];

export default function routing($routeProvider) {
    $routeProvider
        .when('/watch/:episodeId', {
            template: `
                <main class="main">
                    <episode-player ng-if="singleEpisode.episode" episode="singleEpisode.episode"></episode-player>
                </main>
            `,
            controller: function SingleEpisodeController($routeParams, friendsService) {
                var vm = this;

                vm.episode = null;

                activate();

                function activate() {
                    getEpisode();
                }

                function getEpisode() {
                    friendsService
                        .findEpisode($routeParams.episodeId)
                        .then(function (episode) {
                            vm.episode = episode;
                        });
                }
            },
            controllerAs: 'singleEpisode'
        })

        .when('/', {
            template: `
                <main class="main main--list">
                    <search on-query-changed="$ctrl.search(query)"></search>
                
                    <now-playing ng-if="$ctrl.nowPlayingEpisode" episode="$ctrl.nowPlayingEpisode"></now-playing>
                
                    <episodes episodes-data="$ctrl.episodesData"></episodes>
                </main>
            `
        });
}