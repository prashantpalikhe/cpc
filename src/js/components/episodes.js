import angular from 'angular';

const episodes = angular
    .module('episodes', [])
    .component('episodes', {
        bindings: {
            episodesData: '<'
        },
        template: `
            <div class="season" ng-repeat="season in $ctrl.episodesData">
                <h2 class="season__title">Season {{ season.id }}</h2>

                <div class="episodes">
                    <episode ng-repeat="episode in season.episodes" title="{{ episode.title }}" href="#/watch/{{ episode.id }}" img="./src/img/{{ episode.id }}.png"></episode>
                </div>
            </div>
        `
    })
    .name;

export default episodes;