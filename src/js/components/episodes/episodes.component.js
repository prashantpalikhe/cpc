(function () {
    'use strict';

    angular
        .module('app')
        .component('episodes', episodesComponent());

    function episodesComponent() {
        return {
            bindings: {
                episodesData: '<'
            },
            template: `
                <div class="season" ng-repeat="season in $ctrl.episodesData">
                    <h2 class="season__title">Season {{ season.id }}</h2>

                    <div class="episodes">
                        <episode ng-repeat="episode in season.episodes" title="{{ episode.title }}" href="#/season/{{ season.id }}/episode/{{ episode.id }}" img="./src/img/{{ episode.id }}.png"></episode>
                    </div>
                </div>
            `
        }
    }
})();