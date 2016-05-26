(function () {
    'use strict';

    angular
        .module('app')
        .config(configureRoutes);

    function configureRoutes($routeProvider) {
        $routeProvider
            .when('/season/:seasonId/episode/:episodeId', {
                templateUrl: './src/views/single.html',
                controller: 'SingleEpisodeController as singleEpisode'
            })

            .when('/', {
                templateUrl: './src/views/list.html',
                controller: 'EpisodesListController as episodesList'
            })

            .when('/current', {
                templateUrl: './src/views/current.html',
                controller: 'CurrentController as current'
            })
    }
})();