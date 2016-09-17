routing.$inject = ['$routeProvider'];

export default function routing($routeProvider) {
    $routeProvider
        .when('/watch/:episodeId', {
            templateUrl: '/views/single.html',
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
            templateUrl: '/views/list.html'
        });
}