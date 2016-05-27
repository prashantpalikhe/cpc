(function () {
    'use strict';

    angular
        .module('app')
        .config(configureRoutes);

    function configureRoutes($routeProvider) {
        $routeProvider
            .when('/watch/:episodeId', {
                templateUrl: './src/views/single.html',
                controller: 'SingleEpisodeController as singleEpisode'
            })

            .when('/', {
                templateUrl: './src/views/list.html'
            });
    }
})();